/**
 *
 * @flow
 */

import React, { PureComponent } from 'react';
import type { ElementRef } from 'react';
import {
  View,
  Animated,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import images from ':global/images';
import colors from ':global/colors';

import ElementDescription from '../../components/ElementDescription';

import type { ValidationProps } from '../../global/types';
import type { InputType } from './types';

import styles from './styles';

const box = 'box';

type Props = {
  type?: InputType,
  title: string,
  required?: boolean,
  editable?: boolean,
  minLength?: number,
  multiline?: boolean,
  withoutShowButton?: boolean,
  style?: any,
  labelStyle?: any,
  leftStyle?: any,
  textInputStyle?: any,
  value: ?string,
  secureTextEntry?: boolean,
  clearIcon?: any,
  onClear?: Function,
  onBlur?: () => void,
  noPlaceholder?: boolean,
} & ValidationProps;

const labelAnimationDuration = 200;

function ClearData( props ) {
  return (
    <TouchableOpacity
      style={styles.clearWrapper}
      onPress={props.onPress}
      {...props}
    >
      <Image
        source={props.clearIcon}
        style={styles.clearIcon}
      />
    </TouchableOpacity>
  );
}

function SuccessSymbol({ successIcon }) {
  return (
    <View style={styles.successIconWrapper}>
      <Image
        source={successIcon}
        style={styles.successIcon}
      />
    </View>
  );
}

export default class Input extends PureComponent<Props, *> {
  static type = {
    box,
  }

  constructor(props: Props) {
    super(props);
    this.setValidation(props, true);
  }

  textInput: ?ElementRef<typeof TextInput>

  animatedFocused = new Animated.Value(this.props.value && this.props.value.length ? 1 : 0)
  animatedDescriptionHeight = new Animated.Value(this.props.noPlaceholder ? 1 : 0)
  animatedDescriptionOpacity = new Animated.Value(this.props.noPlaceholder ? 1 : 0)
  animatedUnderlineScale = new Animated.Value(0)

  state = {
    focused: false,
    needValidate: false,
    secureTextEntryDisabled: false,
    isValid: true,
    validationDescription: '',
    successValidationDescription: '',
    isRequired: false,
    underlineProps: {
      focused: false,
      validationDescriptionVisible: false,
    },
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setValidation(nextProps);
    const { value } = this.props;
    const nextValue = nextProps.value;
    const valueLength = value && value.length;
    const newMinLength = nextProps.minLength;
    const nextValueLength = nextValue && (!newMinLength || nextValue.length);
    if (!this.state.focused &&
      ((valueLength && !nextValueLength) || (!valueLength && nextValueLength))
    ) {
      this.animatedFocused = new Animated.Value(nextValueLength ? 1 : 0);
    }
  }

  componentDidUpdate(prevProps: Props, prevState: typeof Input.prototype.state) {
    const { needValidate, isValid, validationDescription, successValidationDescription, } = this.state;
    const validationDescriptionVisible = needValidate && ( !isValid || !!successValidationDescription );
    const prevValidationDescriptionVisible = prevState.needValidate && ( !prevState.isValid || !!prevState.successValidationDescription );
    if (
      (validationDescriptionVisible !== prevValidationDescriptionVisible) ||
      (validationDescription !== prevState.validationDescription) ||
      (successValidationDescription !== prevState.successValidationDescription)
    ) {
      const toValue = +this.props.noPlaceholder || +validationDescriptionVisible;
      let opacityAnimationDuration;
      let opacityAnimationDelay;
      if (this.props.type === box) {
        Animated.timing(this.animatedDescriptionHeight, { toValue, duration: 130 }).start();
        opacityAnimationDuration = 200;
        opacityAnimationDelay = 30;
      } else {
        opacityAnimationDuration = 130;
        opacityAnimationDelay = 0;
      }
      Animated.timing(this.animatedDescriptionOpacity, {
        toValue,
        duration: opacityAnimationDuration,
        delay: opacityAnimationDelay,
      }).start();
    }
  }

  focus = () => {
    const { textInput } = this;
    if (textInput) {
      textInput.focus();
    }
  }

  onFocus = () => {
    this.setState(() => ({ focused: true }), () => {
      Animated.timing(this.animatedFocused, {
        toValue: 1,
        duration: labelAnimationDuration,
      }).start();
    });
  }

  onBlur = () => {
    this.setState(() => ({ focused: false, needValidate: true }), () => {
      const { value } = this.props;
      if (!value || !value.length) {
        Animated.timing(this.animatedFocused, {
          toValue: 0,
          duration: labelAnimationDuration,
        }).start();
      }
    });
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur();
    }
  };

  setValidation(
    { required, title, minLength, validations, value }: Props,
    fromConstructor?: boolean,
  ) {
    let allValidations = required ? [{
      rule: (value: string) => value.length > 0,
      description: this.props.noPlaceholder ? `${title}` : `Wrong ${title}`,
    }] : [];
    if (minLength) {
      allValidations.unshift({
        rule: value => (minLength ? value.replace(/ /g, '').length >= minLength : true),
        description: `Wrong ${title} At least ${minLength} symbols`,
      });
    }
    const validationState: Object = { isRequired: validations ? validations.length > 0 : false };
    if (validations) {
      allValidations = [...allValidations, ...validations];
    }

    const failedValidation = allValidations.find(validation => !validation.rule(value || ''));
    if (failedValidation) {
      validationState.isValid = false;
      validationState.successValidationDescription = '';
      validationState.validationDescription = failedValidation.description;
    } else {
      validationState.isValid = true;
      const successValidation = allValidations.find(( validation ) => validation.rule( value || '' ) && validation.success );
      if( successValidation ) {
        validationState.successValidationDescription = successValidation.success;
      }
    }

    if (fromConstructor) {
      this.state = { ...this.state, ...validationState };
    } else {
      this.setState(() => (validationState));
    }
  }

  validate() {
    this.setState(() => ({ needValidate: true }));
    return this.state.isValid;
  }

  setCurrentUnderlineProps() {
    const { focused, needValidate, isValid, successValidationDescription } = this.state;
    const validationDescriptionVisible = needValidate && ( !isValid || !!successValidationDescription );
    this.setState(() => ({ underlineProps: { focused, validationDescriptionVisible } }));
  }

  render() {
    const { props: {
      editable = true,
      twoLineError = false,
      type,
      title,
      style,
      labelStyle,
      leftStyle,
      value,
      multiline,
      withoutShowButton,
      secureTextEntry,
      clearIcon,
      onClear,
      successIcon,
      textInputStyle,
      onPress: customOnPress,
      ...textInputProps
    }, state: {
      focused,
      needValidate,
      isValid,
      validationDescription,
      successValidationDescription,
      secureTextEntryDisabled,
    }, onFocus, onBlur, textInput } = this;

    const isBox = type === box;

    const isSuccessWithDescription = !!successValidationDescription && successValidationDescription.length > 0;

    let onPress;
    if (textInput) {
      onPress = textInput.focus;
    }

    const validationDescriptionVisible = needValidate && ( !isValid || !!successValidationDescription );

    let secureButton;
    if (secureTextEntry && !withoutShowButton) {
      const onSecureButtonPress = secureTextEntryDisabled ?
        () => this.setState(() => ({ secureTextEntryDisabled: false })) :
        () => this.setState(() => ({ secureTextEntryDisabled: true }));
      const secureButtonTitle = secureTextEntryDisabled ? 'Hide' : 'Show';
      secureButton = (
        <TouchableOpacity onPress={onSecureButtonPress} style={styles.secureButton}>
          <Text style={styles.secureButtonTitle}>{secureButtonTitle}</Text>
        </TouchableOpacity>
      );
    }

    const leftStyles = [styles.left, {
      paddingBottom: this.animatedDescriptionHeight.interpolate({
        inputRange: [0, 1],
        outputRange: [4, 6],
      }),
    }, leftStyle];
    const textInputStyles = [
      styles.textInput,
      multiline ? styles.multiline : styles.singleline,
      textInputStyle,
    ];
    const inputStyles = [styles.input];
    if (isBox) {
      inputStyles.push(styles.boxInput);
    }
    inputStyles.push(style);
    const labelStyles = [styles.label, {
      top: this.animatedFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 2],
      }),
      fontSize: this.animatedFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 14],
      }),
    },
      focused
        ? styles.focusedLabel
        : styles.idleLabel,
      ( value && value.length > 0 ) && styles.filledLabel,
      validationDescriptionVisible && styles.errorLabel,
    labelStyle];
    const elementDescriptionStyles = [
      { opacity: this.animatedDescriptionOpacity },
      isBox
        ? {
        marginTop: this.animatedDescriptionHeight.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 8],
        }),
        height: this.animatedDescriptionHeight.interpolate({
          inputRange: [0, 1],
          outputRange: [0, twoLineError ? 32 : 16],
        }),
      }
      : styles.idleDescription,
      styles.description,
      isSuccessWithDescription && styles.successDescription,
    ];
    return (
      <TouchableWithoutFeedback onPress={
        ( !editable && customOnPress )
          ? customOnPress
          : onPress
      }>
        <View style={inputStyles}>
          <Animated.View style={leftStyles}>
            <Animated.Text style={labelStyles}>{title}</Animated.Text>
            <TextInput
              editable={editable}
              value={value || ''}
              style={textInputStyles}
              underlineColorAndroid="transparent"
              placeholderTextColor="gray"
              onFocus={onFocus}
              onBlur={onBlur}
              ref={(ref) => { this.textInput = ref; }}
              multiline={multiline}
              secureTextEntry={secureTextEntry && !secureTextEntryDisabled}
              selectionColor="orange"
              {...textInputProps}
            />
            <Animated.View style={[ elementDescriptionStyles, { flexDirection: 'row', alignItems: 'center', }]}>
              <Image
                source={images.iconAlertRed}
                resizeMode="contain"
              />
              <ElementDescription
                alertIcon
                type={type}
                validationDescriptionVisible={validationDescriptionVisible}
                validationDescription={validationDescription}
                // style={elementDescriptionStyles}
              />
            </Animated.View>
          </Animated.View>
          {
            editable &&
            secureButton
          }
          {
            (editable && onClear && clearIcon) &&
            <ClearData
              clearIcon={clearIcon}
              onPress={onClear}
            />
          }
          {
            ( isSuccessWithDescription && validationDescriptionVisible && successIcon ) &&
            <SuccessSymbol
              successIcon={successIcon}
              onPress={onClear}
            />
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
