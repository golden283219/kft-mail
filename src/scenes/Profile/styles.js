import { StyleSheet } from 'react-native';

import { scale, scaleByVertical } from ':global/layout';
import colors from ':global/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackgroundColor,
  },
  scrollWrapper: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingVertical: scaleByVertical( 15 ),
    marginBottom: scaleByVertical( 15 ),
    paddingHorizontal: scale( 16 ),
    justifyContent: 'space-between',
  },
  logoWrapper: {
    alignItems: 'center',
  },
  logo: {
    height: scaleByVertical( 102 ),
    width: scaleByVertical( 102 ),
  },
  username: {
    fontSize: 16,
    color: colors.screenMainTextColor,
  },
  input: {
    marginVertical: scaleByVertical( 10 ),
    color: colors.inputTextColor,
  },
  symbolButtonWrapper: {
    position: 'absolute',
    top: 15,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scaleByVertical( 10 ),
    paddingVertical: scaleByVertical( 5 ),
  },
  symbolButton: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    borderWidth: 1,
    borderColor: colors.inputTextColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolButtonTitle: {
    fontSize: scaleByVertical( 16 ),
    color: colors.inputTextColor,
  },
  actionsWrapper: {
    marginTop: scaleByVertical( 10 ),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tip: {
    marginVertical: scaleByVertical( 16 ),
    fontSize: scaleByVertical( 14 ),
    color: colors.screenMainTextColor,
    textAlign: 'center',
  },
  attention: {
    fontSize: scaleByVertical( 10 ),
    color: colors.screenMainTextColor,
    textAlign: 'center',
  },
});
