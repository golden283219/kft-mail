
import { Platform, StyleSheet } from 'react-native';
import colors from ':global/colors';

const sizeAndroid = 48;
const widthAndroid = 48;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        flex: 1,
        paddingHorizontal: 16,
      },
      android: {
        minWidth: widthAndroid,
        minHeight: sizeAndroid,
      },
    }),
  },
  title: {
    fontSize: 17,
    lineHeight: 22,
    color: colors.headerBackgroundColor,
  },
});
