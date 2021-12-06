import React from 'react';
import { View, Image, } from 'react-native';

import images from ":global/images";
import ActivityIndicator from ':components/ActivityIndicator';

import styles from './styles';


export default Loading = ( props ) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image
          style={styles.image}
          source={images.iconLogo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.loaderWrapper}>
        <ActivityIndicator />
      </View>
    </View>
  );
};

