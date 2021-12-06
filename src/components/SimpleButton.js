
import React from 'react';
import propTypes from 'prop-types';
import { TouchableOpacity, Text, ViewPropTypes, StyleSheet, } from 'react-native';

import colors from ':global/colors';
import { scaleByVertical, } from ':global/layout';

const styles = StyleSheet.create({
  container: {
    paddingVertical: scaleByVertical( 10 ),
    paddingHorizontal: scaleByVertical( 16 ),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.mainAppColor,
  },
  title: {
    fontWeight: 'bold',
    fontSize: scaleByVertical( 14 ),
    color: colors.screenMainTextColor,
  },
});

const SimpleButton = ({ children, onPress, style, }) => (
  <TouchableOpacity onPress={onPress} style={[ styles.container, style ]}>
    <Text style={styles.title}>{children}</Text>
  </TouchableOpacity>
);

SimpleButton.propTypes = {
  children: propTypes.string,
  onPress: propTypes.func,
  style: ViewPropTypes.style,
};

export default SimpleButton;
