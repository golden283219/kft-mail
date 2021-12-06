
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, } from 'react-native';
import propTypes from 'prop-types';

import { formatNewsDate, } from ':module_news/utils';

import colors from ':global/colors';
import images from ':global/images';
import { scale, scaleByVertical } from ':global/layout';

const styles = StyleSheet.create({
  container: {
    paddingVertical: scaleByVertical(14),
    borderRadius: scaleByVertical(5),
    backgroundColor: colors.screenBackgroundLightColor,
    borderWidth: 1,
    borderColor: 'rgba( 0, 0, 0, 0.2 )'
  },
  headerWrapper: {
    marginLeft: scaleByVertical(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    height: scaleByVertical(30),
    width: scaleByVertical(30),
  },
  headerText: {
    marginLeft: scaleByVertical(3),
    fontSize: 12,
    color: colors.screenSubtextColor
  },
  contentContainer: {
    paddingHorizontal: scaleByVertical(16),
  },
  title: {
    marginVertical: scaleByVertical(3),
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.screenMainTextColor
  },
  brief: {
    fontSize: 14,
    color: colors.screenSubtextColor
  },
});

const NewsItem = ({ companyName, time, title, brief, onPress, }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.headerWrapper}>
      <Image
        style={styles.logoIcon}
        source={images.iconLogo}
        resizeMode="contain"
      />
      <Text style={styles.headerText}>{companyName}・{formatNewsDate(time)}</Text>
    </View>
    <View style={styles.contentContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
  </TouchableOpacity>
);


NewsItem.propTypes = {
  companyName: propTypes.string,
  time: propTypes.oneOfType([propTypes.string, propTypes.number]),
  title: propTypes.string,
  brief: propTypes.string,
  onPress: propTypes.func,
};


export default NewsItem;
