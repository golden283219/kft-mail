
import React from 'react';
import { Image, Text, TouchableOpacity, ViewPropTypes, } from 'react-native';
import propTypes from 'prop-types';

import styles from './styles';

const HeaderButton = ({ title, iconSource, style, iconStyle, onPress }) => (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        {title && <Text style={styles.title}>{title}</Text>}
        {iconSource && <Image source={iconSource} style={[iconStyle]} resizeMode="contain"/>}
    </TouchableOpacity>
);

HeaderButton.propTypes = {
  title: propTypes.string,
  style: ViewPropTypes.style,
  iconStyle: Image.propTypes.style,
  iconSource: Image.propTypes.source,
  onPress: propTypes.func,
};

export default HeaderButton;
