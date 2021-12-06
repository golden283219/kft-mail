
import React from 'react';
import { RefreshControl } from 'react-native';
import propTypes from 'prop-types';

import colors from ':global/colors';

const Refresher = ( props ) => (
  <RefreshControl tintColor={ colors.loadingIndicatorColor } colors={[ colors.loadingIndicatorColor ]} {...props} />
);

Refresher.propTypes = {
  refreshing: propTypes.bool,
  onRefresh: propTypes.func,
};

export default Refresher;
