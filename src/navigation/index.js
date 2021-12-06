
import React from 'react';
import { createAppContainer, } from 'react-navigation';
import { isAndroid } from ':global/constants';
import Navigator from './Navigator';

export default createAppContainer( Navigator );
