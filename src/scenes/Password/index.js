import React, { PureComponent } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, Alert, Linking, } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { updatePassword, } from ':module_auth/actionCreators';

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
    isLastFieldFilled: false,
    oldPassword: '',
    newPassword: '',
    newPasswordRetyped: '',
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



  onSavePress = () => {
    const { oldPassword, newPassword, newPasswordRetyped, } = this.state;
    const { actions: { updatePassword, }} = this.props;

    if( !oldPassword || !newPassword ) {
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
    } else if( newPassword !== newPasswordRetyped ) {
      this.setState({
        isLastFieldFilled: true,
      });
    } else {
      updatePassword( oldPassword, newPassword );
      this.setState({
        isValidatedByBackend: true,
        isEditMode: false,
        isLastFieldFilled: true,
      });
    }
  };

  isFieldValid = ( fieldValidationData ) => !( !!fieldValidationData && fieldValidationData.length > 0 );


  render() {
    const { isLastFieldFilled, isValidatedByBackend, oldPassword, newPassword, newPasswordRetyped, } = this.state;
    const {
      validationResult,
      navigation: { navigate, goBack, },
    } = this.props;

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          enableOnAndroid
          ref={( item ) => this.keyboardAwareScrollView = item }
          style={styles.scrollWrapper}
          contentContainerStyle={styles.contentContainer}
          extraScrollHeight={ isIos ? scaleByVertical( 15 ) : 0 }
        >

          <Input
            required
            minLength={1}
            secureTextEntry
            withoutShowButton
            type={Input.type.box}
            title="Current Password"
            multiline={false}
            value={oldPassword}
            onChangeText={
              ( oldPassword ) => this.setState({
                isValidatedByBackend: false, oldPassword,
                isLastFieldFilled: false,
              })}
            ref={(ref) => { this._currentPassword = ref; }}
            style={styles.input}
            validations={[{
              rule: () => isValidatedByBackend
                ? this.isFieldValid( validationResult.oldPassword )
                : true,
              description: 'Wrong current password',
            }]}
            {...this.getNotLastInputProps(() => this.activateNextInput( this._newPassword ))}
          />

          <Input
            // required
            // minLength={1}
            secureTextEntry
            withoutShowButton
            type={Input.type.box}
            title="New password"
            multiline={false}
            value={newPassword}
            onChangeText={
              ( newPassword ) => this.setState({
                isValidatedByBackend: false, newPassword,
                isLastFieldFilled: false,
              })
            }
            ref={(ref) => { this._newPassword = ref; }}
            style={styles.input}
            validations={[
              {
                rule: ( str ) => ( str && str.length > 0 ),
                description: 'Too short password',
              },
              {
                rule: ( id ) => isValidatedByBackend
                  ? this.isFieldValid( validationResult.newPassword )
                  : id && id.length > 0,
                description: 'Wrong new password',
              },
            ]}
            {...this.getNotLastInputProps(() => this.activateNextInput( this._newPasswordRetyped ))}
          />


          <Input
            secureTextEntry
            withoutShowButton
            type={Input.type.box}
            title="Retype New Password"
            multiline={false}
            value={newPasswordRetyped}
            onChangeText={
              ( newPasswordRetyped ) => this.setState({
                isValidatedByBackend: false, newPasswordRetyped,
              })
            }
            ref={(ref) => { this._newPasswordRetyped = ref; }}
            style={styles.input}
            validations={[
              {
                rule: ( str ) => ( str && str.length > 0 ),
                description: 'Too short password',
              },
              {
                rule: () => ( !isLastFieldFilled || newPassword === newPasswordRetyped ),
                description: 'New Password & Retyped New Password isn\'t equals',
              },
              {
                rule: () => isValidatedByBackend
                  ? this.isFieldValid( validationResult.newPassword )
                  : true,
                description: 'Wrong Retyped New Password',
              },
            ]}
            onSubmitEditing={this.onSavePress}
            returnKeyType="go"
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
};

export default connect(
  ({ auth }) => ({
    validationResult: auth.updatePasswordValidationBadFields,
  }),
  ( dispatch ) => ({
    actions: bindActionCreators({
      updatePassword,
    }, dispatch),
  })
)( Login);