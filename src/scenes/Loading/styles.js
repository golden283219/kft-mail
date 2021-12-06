import { StyleSheet } from 'react-native';

import { scale, scaleByVertical } from ':global/layout';

import colors from ':global/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.screenBackgroundColor,
  },
  logoWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: scaleByVertical( 40 ),
  },
  loaderWrapper: {
    paddingBottom: scaleByVertical( 40 ),
  },
});
