
import { Platform, Dimensions, StatusBar } from 'react-native';

export const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const minSize = 44;
export const horizontalOffset = 30;
export const listHorizontalOffset = 20;
export const borderRadius = 3;

let innerStatusBarHeight;
let innerNavigationBarHeight;
let innerTabBarHeight;

if (isIos) {
  const iphoneXSize = 812;
  const isIphoneX = (
    !Platform.isPad &&
    !Platform.isTVOS &&
    (screenHeight === iphoneXSize || screenWidth === iphoneXSize)
  );

  innerStatusBarHeight = isIphoneX ? 44 : 20;
  innerNavigationBarHeight = 44;
  innerTabBarHeight = isIphoneX ? 83 : 49;
} else {
  const barHeight = 56;
  innerStatusBarHeight = StatusBar.currentHeight;
  innerNavigationBarHeight = barHeight;
  innerTabBarHeight = barHeight;
}

export const appBarHeight = innerStatusBarHeight + innerNavigationBarHeight;
export const statusBarHeight = innerStatusBarHeight;
export const navigationBarHeight = innerNavigationBarHeight;
export const tabBarHeight = innerTabBarHeight;
