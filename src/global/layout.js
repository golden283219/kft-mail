import {
  Dimensions,
  Platform
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Used for scaling on different screens( phones, tablets )
export const isIOS = Platform.OS === 'ios';
const designWidth = 375;
const designHeight = 617;

export const scale = value => Math.round(( width / designWidth ) * value );
export const scaleByVertical = value => Math.round(( height / designHeight ) * value );

export default {
  window: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
};

