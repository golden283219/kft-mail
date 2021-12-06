import React, {PureComponent} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {login} from ':module_auth/actionCreators';

import colors from ':global/colors';
import images from ':global/images';
import routeNames from ':global/routeNames';
import {scale, scaleByVertical} from ':global/layout';
import {dismissAndScrollToEnd, getNotLastInputProps} from ':global/utils';

import Input from ':components/Input';
import SimpleButton from ':components/SimpleButton';
import TextButton from ':components/TextButton';

import styles from './styles';
import firebase from 'react-native-firebase';

class Login extends PureComponent {
  state = {
    isValidatedByBackend: false,
    email: '',
    password: '',
    // email: 'admin@mail.com',
    // password: 'QWE12pass',
  };

  async componentDidMount() {
    const token = await firebase.messaging().getToken();
    console.log(token);
  }

  getNotLastInputProps = nextFormItemName =>
    getNotLastInputProps(this, nextFormItemName, this.keyboardAwareScrollView);
  activateNextInput = (ref, ...params) => {
    if (ref) {
      if (ref.open) ref.open();
      else if (ref.focus) ref.focus();
    }
  };

  onEmailQuestionPress = () => {
    const {isValidatedByBackend, email, password} = this.state;
    const {
      validationResult,
      navigation: {navigate},
    } = this.props;

    if (
      !isValidatedByBackend ||
      (isValidatedByBackend && this.isFieldValid(validationResult.email))
    ) {
      Alert.alert(null, 'LC Order Email', [{text: 'OK', onPress: () => {}}], {
        cancelable: true,
      });
    } else {
      Alert.alert(
        null,
        validationResult.email[0],
        [{text: 'OK', onPress: () => {}}],
        {cancelable: true},
      );
    }
  };

  onLoginPress = () => {
    const {email, password} = this.state;
    const {
      actions: {login},
    } = this.props;

    if (!email || !password) {
      Alert.alert(
        'Error',
        'Please fill all fields',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {
          cancelable: false,
        },
      );
    } else {
      login(email, password);
      this.setState({isValidatedByBackend: true});
    }
  };

  isFieldValid = fieldValidationData =>
    !(fieldValidationData && fieldValidationData.length > 0);

  render() {
    const {isValidatedByBackend, email, password} = this.state;
    const {
      validationResult,
      navigation: {navigate},
    } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView
          ref={item => (this.keyboardAwareScrollView = item)}
          style={styles.scrollWrapper}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.logoWrapper}>
            <Image
              source={images.iconLogo}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View>
            <Input
              required
              minLength={1}
              // importantForAutofill="yes"
              type={Input.type.box}
              title="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              multiline={false}
              value={email}
              onChangeText={email =>
                this.setState({isValidatedByBackend: false, email})
              }
              ref={ref => {
                this._email = ref;
              }}
              style={styles.input}
              twoLineError
              validations={[
                {
                  rule: () =>
                    isValidatedByBackend
                      ? this.isFieldValid(validationResult.email)
                      : true,
                  description:
                    !isValidatedByBackend ||
                    (isValidatedByBackend &&
                      this.isFieldValid(validationResult.email))
                      ? 'Wrong Email'
                      : validationResult.email[0],
                },
              ]}
              {...this.getNotLastInputProps(() =>
                this.activateNextInput(this._password),
              )}
            />

            <TouchableOpacity
              onPress={this.onEmailQuestionPress}
              style={styles.symbolButtonWrapper}>
              <View style={styles.symbolButton}>
                <Text style={styles.symbolButtonTitle}>?</Text>
              </View>
            </TouchableOpacity>
          </View>

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
            onChangeText={password =>
              this.setState({isValidatedByBackend: false, password})
            }
            ref={ref => {
              this._password = ref;
            }}
            style={{color: colors.inputTextColor}}
            validations={[
              {
                rule: () =>
                  isValidatedByBackend
                    ? this.isFieldValid(validationResult.password)
                    : true,
                description: 'Wrong Password',
              },
            ]}
            onSubmitEditing={this.onLoginPress}
            returnKeyType="go"
          />

          <View style={styles.actionsWrapper}>
            <SimpleButton onPress={this.onLoginPress}>LOG IN</SimpleButton>
            <Text style={styles.tip}>
              New user?
              <TextButton onPress={() => navigate(routeNames.signUp)}>
                {' '}
                Create account{' '}
              </TextButton>
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  ({auth}) => ({
    validationResult: auth.loginValidationBadFields,
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
        login,
      },
      dispatch,
    ),
  }),
)(Login);
