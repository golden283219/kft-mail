import { StyleSheet } from 'react-native';

import { scale, scaleByVertical } from ':global/layout';
import colors from ':global/colors';

export default StyleSheet.create({
  header: {
    backgroundColor: colors.screenBackgroundColor,
  },
  container: {
    flex: 1,
    backgroundColor: colors.screenBackgroundColor,
  },
  contentContainer: {
    paddingTop: scale(8),
    paddingHorizontal: scale(8),
    backgroundColor: colors.screenBackgroundColor,
  },
  listSeparator: {
    height: scale(8),
  },
});
