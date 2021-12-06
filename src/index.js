
import React, { Component } from 'react';
import { YellowBox, StatusBar, View, } from 'react-native';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import colors from ':global/colors';
import { isIos, } from ':global/constants';
import ActivityIndicator from ':components/ActivityIndicator';
import PushNotification from 'react-native-push-notification';

import Navigation from './navigation';
import * as NavigationHelper from './navigation/NavigationHelper';
import store from './reducer';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

YellowBox.ignoreWarnings([
  '-[RCTRootView cancelTouches]',
  'componentWillReceiveProps has been renamed',
  'componentWillMount has been renamed'
]);

PushNotification.configure({
  onRegister: function (token) {
    console.log("Token: -----", token)
    // alert(token.token)
  },
  onNotification: function (notification) {
    console.log("Notification: -----", notification)

    PushNotification.localNotification({
      message: "Test"
    })
  }
  ,
  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },
  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true
  }
})

const LoadingRaw = ({ isLoading }) => {
  if (isLoading) return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}>
      <View style={{ flex: 1, backgroundColor: 'rgba( 0, 0, 0, 0.3 )', }} />
      <ActivityIndicator style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      />
    </View>
  );
  else return null;
};

const Loading = connect(({ app }) => ({ isLoading: app.isLoading }), null)(LoadingRaw);

export default class App extends Component {
  render() {
    return [
      <StatusBar key="status-bar" barStyle="dark-content" backgroundColor={colors.statusbarBackgroundColor} />,
      <Provider key="app" store={store}>
        <Navigation
          screenProps={{ dispatch: store.dispatch, getState: store.getState, }}
          ref={nav => {
            this.navigator = nav;
            NavigationHelper.setNavigator(this.navigator);
          }}
        />
        <Loading />
      </Provider>
    ];
  }
}
