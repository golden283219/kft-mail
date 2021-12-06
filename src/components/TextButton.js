
import React from 'react';
import propTypes from 'prop-types';
import { Text, ViewPropTypes, StyleSheet, } from 'react-native';

import colors from ':global/colors';
import { scaleByVertical, } from ':global/layout';

const styles = StyleSheet.create({
  title: {
    fontSize: scaleByVertical( 14 ),
    color: colors.alertTextColor,
  },
  titleSmall: {
    fontSize: scaleByVertical( 10 ),
  },
});

const TextButton = ({ isSmall, children, onPress, style, }) => (
  <Text onPress={onPress} style={[ styles.title, isSmall && styles.titleSmall, style ]}>{children}</Text>
);

TextButton.propTypes = {
  isSmall: propTypes.bool,
  children: propTypes.string,
  onPress: propTypes.func,
  style: Text.propTypes.style,
};

export default TextButton;
