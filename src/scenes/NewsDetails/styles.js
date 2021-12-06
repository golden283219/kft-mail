import { StyleSheet } from 'react-native';

import { scale, scaleByVertical } from ':global/layout';
import colors from ':global/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale( 8 ),
    backgroundColor: colors.screenBackgroundColor,
  },
  contentWrapper: {
    flex: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba( 0, 0, 0, 0.2 )',
    backgroundColor: colors.screenBackgroundLightColor,
  },
  loadingWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
