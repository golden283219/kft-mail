/**
 *
 * @flow
 */

import React from 'react';
import { Animated } from 'react-native';

import { isAndroid } from '../../global/constants';

import styles from './styles';

const box = 'box';

export default function ElementDescription({
  title,
  validationDescriptionVisible,
  validationDescription,
  style,
}: {
  type?: 'box',
  title?: string,
  validationDescriptionVisible: boolean,
  validationDescription: string,
  style?: any,
}) {
  let description;
  if (!validationDescriptionVisible && title) {
    description = title;
  } else {
    description = validationDescription;
  }
  if (isAndroid && (!description || !description.length)) {
    description = ' ';
  }
  const descriptionStyles = [styles.description];
  descriptionStyles.push(style);
  return (
    <Animated.Text style={descriptionStyles} animated>{description}</Animated.Text>
  );
}

ElementDescription.type = { box };
