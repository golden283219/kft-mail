/**
 *
 * @flow
 */

import { StyleSheet } from 'react-native';

import { borderRadius } from ':global/constants';
import colors from ':global/colors';

export default StyleSheet.create({
  input: {
    flexDirection: 'row',
  },
  boxInput: {
    backgroundColor: colors.screenBackgroundColor,
    borderRadius,
  },
  left: {
    flex: 1,
  },
  label: {
    position: 'absolute',
    left: 0,
    lineHeight: 22,
    color: colors.inputTextColor,
    backgroundColor: colors.screenBackgroundColor,
  },
  idleLabel: {
    color: colors.inputTextColor,
    backgroundColor: colors.screenBackgroundColor,
  },
  focusedLabel: {
    color: colors.inputTextColor,
    backgroundColor: colors.screenBackgroundColor,
  },
  filledLabel: {
    color: colors.inputTextColor,
    backgroundColor: colors.screenBackgroundColor,
  },
  errorLabel: {
    color: colors.alertTextColor,
    backgroundColor: colors.screenBackgroundColor,
  },
  textInput: {
    marginTop: 24,
    fontSize: 16,
    padding: 0,
    paddingBottom: 4,
    color: colors.screenMainTextColor,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba( 0, 0, 0, 0.4 )',
  },
  singleline: {
    height: 22,
  },
  multiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  secureButton: {
    justifyContent: 'center',
    marginRight: 10,
  },
  secureButtonTitle: {
    fontSize: 16,
  },
  description: {
    paddingLeft: 0,
  },
  idleDescription: {
    marginTop: 2,
  },
  successDescription: {
    color: 'green',
  },
  clearWrapper: {
    paddingHorizontal: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearIcon: {
    height: 14,
    width: 14,
  },
  successIconWrapper: {
    position: 'absolute',
    top: -5,
    bottom: 0,
    right: 0,
    paddingHorizontal: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  successIcon: {
    height: 14,
    width: 20,
  },
});
