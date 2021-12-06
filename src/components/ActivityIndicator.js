
import React from 'react';
import { ActivityIndicator as OriginalActivityIndicator, } from 'react-native';

import colors from ':global/colors';

const ActivityIndicator = ( props ) => (
  <OriginalActivityIndicator
    size="large"
    color={ colors.loadingIndicatorColor }
    tintColor={ colors.loadingIndicatorColor }
    colors={[ colors.loadingIndicatorColor ]}
    {...props}
  />
);

export default ActivityIndicator;
