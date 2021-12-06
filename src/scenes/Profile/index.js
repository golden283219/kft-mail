import React, { PureComponent } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Linking,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { updateUserProfile, } from ':module_user/actionCreators';

import colors from ':global/colors';
import images from ':global/images';
import routeNames from ':global/routeNames';
import { scale, scaleByVertical } from ':global/layout';
import { isIos, isAndroid, } from ':global/constants';
import { dismissAndScrollToEnd, getNotLastInputProps, } from ':global/utils';

import Input from ':components/Input';
import SimpleButton from ':components/SimpleButton';
import TextButton from ':components/TextButton';

import styles from './styles';

class Login extends PureComponent {

  state = {
    isEditMode: false,
    isValidatedByBackend: true,
    fullName: this.props.fullName,
    revelEstId: this.props.revId,
    companyName: this.props.companyName,
    isLoading: false
  };

  getNotLastInputProps = ( nextFormItemName ) => getNotLastInputProps(
    this,
    nextFormItemName,
    this.keyboardAwareScrollView
  );
  activateNextInput = ( ref, ...params ) => {
    if( ref ) {
      if( ref.open ) ref.open();
      else if( ref.focus ) ref.focus();
    }
  };

  isStringValid = ( str, minLength = 0 ) => ( typeof( str ) === 'string' && str.length >= minLength );
  isAllEnteredDataCorrect = () => {};

  onRevelEstIDQuestionPress = () => {
    const url = 'http://id.kungfutea.com';

    Linking.canOpenURL( url )
      .then(( isSupported ) => {
        if( isSupported ) return Linking.openURL( url );
        else {
          console.warn( 'Can\'t open url: ' + url );
        }})
      .catch( ( err ) => console.warn( 'An error occurred', err ) );
  };

  onSavePress = () => {
    const { fullName, revelEstId, companyName, } = this.state;
    const { actions: { updateUserProfile, }} = this.props;

    if( !revelEstId || !fullName || !companyName ) {
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
      updateUserProfile( revelEstId, fullName, companyName );
      this.setState({ isValidatedByBackend: true, isEditMode: false, });
    }
  };

  isFieldValid = ( fieldValidationData ) => !( !!fieldValidationData && fieldValidationData.length > 0 );

  onPasswordPress = () => {
    const { navigation: { navigate, }, } = this.props;

    return navigate( routeNames.password );
  };


  render() {
    const { isEditMode, isValidatedByBackend, fullName, revelEstId, companyName, isLoading } = this.state;
    const {
      email,
      validationResult,
      navigation: { navigate, goBack, },
    } = this.props;

    const isEditable = (
      isEditMode ||
      !isValidatedByBackend ||
      ( validationResult && Object.keys( validationResult ).length > 0 )
    );

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          enableOnAndroid
          ref={( item ) => this.keyboardAwareScrollView = item }
          style={styles.scrollWrapper}
          contentContainerStyle={styles.contentContainer}
          extraScrollHeight={ isIos ? scaleByVertical( 15 ) : 0 }
        >
          <View style={styles.logoWrapper}>
            <Image
              source={images.iconLogo}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.username}>{email}</Text>
          </View>

          <TouchableWithoutFeedback onPress={this.onPasswordPress}>
            <View>
              <Input
                editable={false}
                type={Input.type.box}
                title="Password"
                multiline={false}
                value="*******"
                style={styles.input}
                onPress={this.onPasswordPress}
              />
              <Image
                style={{
                  position: 'absolute',
                  right: scaleByVertical( 5 ),
                  bottom: scaleByVertical( 26 ),
                  width: scaleByVertical( 11 ),
                  height: scaleByVertical( 12 ),
                }}
                source={images.iconArrowRightBlack}
                resizeMode="contain"
            />
            </View>
          </TouchableWithoutFeedback>


          <Input
            editable={isEditable}
            required
            minLength={1}
            type={Input.type.box}
            title="First & Last Name"
            multiline={false}
            value={fullName}
            onChangeText={( fullName ) => this.setState({ isValidatedByBackend: false, fullName })}
            ref={(ref) => { this._fullName = ref; }}
            style={styles.input}
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
              editable={isEditable}
              required
              minLength={1}
              type={Input.type.box}
              title="Revel Est ID"
              multiline={false}
              value={revelEstId}
              onChangeText={( revelEstId ) => this.setState({ isValidatedByBackend: false, revelEstId })}
              ref={(ref) => { this._revelEstId = ref; }}
              style={styles.input}
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
            editable={isEditable}
            required
            minLength={1}
            type={Input.type.box}
            title="Company Name"
            multiline={false}
            value={companyName}
            onChangeText={( companyName ) => this.setState({ isValidatedByBackend: false, companyName })}
            ref={(ref) => { this._companyName = ref; }}
            style={styles.input}
            validations={[{
              rule: () => isValidatedByBackend
                ? this.isFieldValid( validationResult.companyName )
                : true,
              description: 'Wrong Company Name',
            }]}
            onSubmitEditing={this.onSavePress}
            returnKeyType="go"
          />



          <View style={styles.actionsWrapper}>
            <SimpleButton
              onPress={() => {
                if( isEditable ) this.onSavePress();
                else if( this._fullName && this._fullName.focus ) {
                  this.setState({ isEditMode: true, });
                  setTimeout(() => this._fullName.focus(), 0);
                }
              }}
            >{ isEditable ? 'SAVE' : 'EDIT' }</SimpleButton>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
};

export default connect(
  ({ user }) => ({
    validationResult: user.updateProfileValidationBadFields,
    email: user.email,
    revId: user.revId,
    fullName: user.fullName,
    companyName: user.companyName,
  }),
  ( dispatch ) => ({
    actions: bindActionCreators({
      updateUserProfile,
    }, dispatch),
  })
)( Login);