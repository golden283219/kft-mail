
import React from 'react';
import { ScrollView, View, } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import { createStackNavigator, } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems, } from 'react-navigation-drawer';

import routeNames from ':global/routeNames';
import { scale, scaleByVertical } from ':global/layout';

import routeConfig from './routeConfig';



const drawer = createDrawerNavigator(routeConfig, {
  drawerBackgroundColor: 'rgba( 128, 32, 32, 0.4 )',
  drawerType: 'front',
  hideStatusBar: true,

  contentOptions: {
    activeTintColor: '#e91e63',
    itemsContainerStyle: {
      marginVertical: 0,
    },
    iconContainerStyle: {
      opacity: 1
    }
  },

  contentComponent: (props) => {
    const translateX = Animated.interpolate(props.drawerOpenProgress, {
      inputRange: [0, 1],
      outputRange: [-1000, 0],
    });
    const translateY = Animated.interpolate(props.drawerOpenProgress, {
      inputRange: [0, 1],
      outputRange: [1, 0],
    });



    return (
      <SafeAreaProvider>
        <Animated.View style={[{ transform: [{ translateX, translateY, }] }, { flex: 1, }]}>
          <ScrollView style={{ flex: 1, }}>
            <SafeAreaView
              style={{ flex: 1, }}
              forceInset={{ top: 'always', horizontal: 'never' }}
            >
              <View style={{ flex: 1, }}>
                <DrawerItems {...props} />
              </View>
            </SafeAreaView>
          </ScrollView>
        </Animated.View>
      </SafeAreaProvider>
    );
  },
});



const stack = createStackNavigator(routeConfig, {
  mode: 'card',
  initialRouteName: routeNames.loading,
  transparentCard: true,
  cardStyle: {
    opacity: 1,
  },
  navigationOptions: {
    header: null,
  },
  defaultNavigationOptions: {
    // header: null,
  },
});

export default stack;