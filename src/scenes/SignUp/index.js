import React, { PureComponent } from 'react';
import { View, Image, Text, TouchableOpacity, Linking, Alert, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signUp, } from ':module_auth/actionCreators';

import colors from ':global/colors';
import images from ':global/images';
import routeNames from ':global/routeNames';
import { scale, scaleByVertical } from ':global/layout';
import { dismissAndScrollToEnd, getNotLastInputProps, } from ':global/utils';

import Input from ':components/Input';
import SimpleButton from ':components/SimpleButton';
import TextButton from ':components/TextButton';

import styles from './styles';
import { navigate } from "../../navigation/NavigationHelper";


class SignUp extends PureComponent {
  state = {
    isValidatedByBackend: false,
    email: '',
    password: '',
    fullName: '',
    revelEstId: '',
    companyName: '',
  };

  getNotLastInputProps = ( nextFormItemName ) => getNotLastInputProps(
    this,
    nextFormItemName,
    this.keyboardAwareScrollView
  );
  dismissAndScrollToEnd = () => dismissAndScrollToEnd( this.keyboardAwareScrollView );
  activateNextInput = ( ref, ...params ) => {
    if( ref ) {
      if( ref.open ) ref.open();
      else if( ref.focus ) ref.focus();
    }
  };
  focusTo = ( inputRef ) => inputRef && inputRef.focus();
  isStringValid = ( str, minLength = 0 ) => ( typeof( str ) === 'string' && str.length >= minLength );
  isAllEnteredDataCorrect = () => {};

  onUrlPress = ( urlAddr ) => {
    Linking.canOpenURL( urlAddr )
      .then(( isSupported ) => {
        if( isSupported ) return Linking.openURL( urlAddr );
        else {
          console.warn( 'Can\'t open url: ' + url );
        }})
      .catch( ( err ) => console.warn( 'An error occurred', err ) );
  };

  onRevelEstIDQuestionPress = () => {
    this.onUrlPress( 'http://id.kungfutea.com' );
  };
  onTermsOfUsePress = () => {
    this.onUrlPress( 'https://www.kungfutea.com/terms-of-use-kft-group-app' );
  };
  onPrivacyPolicyPress = () => {
    this.onUrlPress( 'https://www.kungfutea.com/privacy-policy-kft-group-app' );
  };

  onSignUpPress = () => {
    const { email, password, fullName, revelEstId, companyName, } = this.state;
    const { actions: { signUp, }} = this.props;

    if( !email || !password || !revelEstId || !fullName || !companyName ) {
      Alert.alert(
        'Error',
        'Please fill all fields',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {
          cancelable: false,
        },
      );
    } else {
      signUp( email, password, revelEstId, fullName, companyName );
      this.setState({ isValidatedByBackend: true, });
    }
  };

  isFieldValid = ( fieldValidationData ) => !( fieldValidationData && fieldValidationData.length > 0 );

  render() {
    const { isValidatedByBackend, email, password, fullName, revelEstId, companyName, } = this.state;
    const { validationResult, navigation: { navigate, goBack }} = this.props;

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          enableOnAndroid
          ref={( item ) => this.keyboardAwareScrollView = item }
          style={styles.scrollWrapper}
          contentContainerStyle={styles.contentContainer}
          extraScrollHeight={scaleByVertical( 15 )}
        >
          <Input
            required
            minLength={1}
            type={Input.type.box}
            title="LC Order Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            multiline={false}
            value={email}
            onChangeText={( email ) => this.setState({ isValidatedByBackend: false, email })}
            ref={(ref) => { this._email = ref; }}
            style={{ color: colors.inputTextColor, }}
            validations={[{
              rule: () => isValidatedByBackend
                ? this.isFieldValid( validationResult.email )
                : true,
              description: 'Wrong Email',
            }]}
            {...this.getNotLastInputProps(() => this.activateNextInput( this._password ))}
          />

          <Input
            required
            minLength={1}
            secureTextEntry
            withoutShowButton
            type={Input.type.box}
            title="Password"
            autoCorrect={false}
            multiline={false}
            value={password}
            onChangeText={( password ) => this.setState({ isValidatedByBackend: false, password })}
            ref={(ref) => { this._password = ref; }}
            style={{ color: colors.inputTextColor, }}
            validations={[{
              rule: () => isValidatedByBackend
                ? this.isFieldValid( validationResult.password )
                : true,
              description: 'Wrong Password',
            }]}
            {...this.getNotLastInputProps(() => this.activateNextInput( this._fullName ))}
          />
          <Input
            required
            minLength={1}
            type={Input.type.box}
            title="First & Last Name"
            multiline={false}
            value={fullName}
            onChangeText={( fullName ) => this.setState({ isValidatedByBackend: false, fullName })}
            ref={(ref) => { this._fullName = ref; }}
            style={{ color: colors.inputTextColor, }}
            validations={[{
              rule: () => isValidatedByBackend
                ? this.isFieldValid( validationResult.fullName )
                : true,
              description: 'Wrong First & Last Name',
            }]}
            {...this.getNotLastInputProps(() => this.activateNextInput( this._revelEstId ))}
          />

          <View>
            <Input
              required
              minLength={1}
              type={Input.type.box}
              title="Revel Est ID"
              multiline={false}
              value={revelEstId}
              onChangeText={( revelEstId ) => this.setState({ isValidatedByBackend: false, revelEstId })}
              ref={(ref) => { this._revelEstId = ref; }}
              style={{ color: colors.inputTextColor, }}
              validations={[{
                rule: ( id ) => isValidatedByBackend
                  ? this.isFieldValid( validationResult.revelEstId )
                  : id && id.length > 0,
                description: 'Wrong ID',
              }]}
              {...this.getNotLastInputProps(() => this.activateNextInput( this._companyName ))}
            />

            <TouchableOpacity
              onPress={this.onRevelEstIDQuestionPress}
              style={styles.symbolButtonWrapper}>
              <View style={styles.symbolButton}>
                <Text style={styles.symbolButtonTitle}>?</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Input
            required
            minLength={1}
            type={Input.type.box}
            title="Company Name"
            multiline={false}
            value={companyName}
            onChangeText={( companyName ) => this.setState({ isValidatedByBackend: false, companyName })}
            ref={(ref) => { this._companyName = ref; }}
            style={{ color: colors.inputTextColor, }}
            validations={[{
              rule: () => isValidatedByBackend
                ? this.isFieldValid( validationResult.companyName )
                : true,
              description: 'Wrong Company Name',
            }]}
            onSubmitEditing={this.onSignUpPress}
            returnKeyType="go"
          />

          <View style={styles.actionsWrapper}>
            <SimpleButton onPress={this.onSignUpPress}>SIGN UP</SimpleButton>
            <Text style={styles.tip}>Have an Account?
              <TextButton onPress={() => goBack()}> Log In</TextButton>
            </Text>

            <Text style={styles.attention}>By clicking Create account you agree to our{`\n`}
              <TextButton
                isSmall
                onPress={this.onTermsOfUsePress}
              > Terms of Use </TextButton>
               and
              <TextButton
                isSmall
                onPress={this.onPrivacyPolicyPress}
              > Privacy Policy </TextButton>
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
};

// TODO: Implement 'on Terms of Use' AND 'on Privacy Policy'

export default connect(
  ({ auth }) => ({
    validationResult: auth.signUpValidationBadFields,
  }),
  ( dispatch ) => ({
    actions: bindActionCreators({
      signUp,
    }, dispatch),
  })
)( SignUp);