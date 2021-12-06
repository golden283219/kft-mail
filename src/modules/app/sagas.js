
import { AppState, } from 'react-native';
import { call, put, spawn, select, take, takeEvery, takeLatest, } from 'redux-saga/effects';
import { eventChannel, } from 'redux-saga';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { getUniqueId, } from 'react-native-device-info';

import { init as authInit, logout, } from ':module_auth/sagas';
import { init as userInit, } from ':module_user/sagas';
import { init as newsInit, } from ':module_news/sagas';
import { navigateToNewsDetails, fetchNewsList, } from ':module_news/actionCreators';

import { callApi, callTmpApi, endpoints } from ':global/api';
import routeNames from ':global/routeNames';
import { isIos, } from ':global/constants';
import * as navigationActions from ':navigation/NavigationHelper';

import * as actions from './actionCreators';
import { START_LISTEN_PUSH_NOTIFICATION, STOP_LISTEN_PUSH_NOTIFICATION, GET_LINK_INFO, GET_QUICK_LINK } from "./actionTypes";

function* setNotificationData(notificationToken) {
  try {
    const deviceId = getUniqueId();

    yield callApi({
      method: 'POST',
      endpoint: endpoints.setNotificationData,
      payload: {
        device_id: `${deviceId}`,
        application_id: isIos
          ? 'ios_app'
          : 'android_app',
        registration_id: notificationToken,
      },
    });

  } catch (err) {
    console.log(err);
  }
};

function* clearNotifications() {
  try {
    if (isIos) {
      PushNotificationIOS.setApplicationIconBadgeNumber(0);
      PushNotificationIOS.removeAllDeliveredNotifications();
    }
    PushNotification.cancelAllLocalNotifications();
    PushNotification.setApplicationIconBadgeNumber(0);
  } catch (err) {
    console.log(err);
  }
};

function handleAppStateChange(onNewAction) {
  if (!this || !this._appStateHandler) {
    this._appStateHandler = (appState) => {
      onNewAction({
        appStateData: {
          appState,
        },
      });
    };
  }
  return this._appStateHandler;
};

const startListenOpeningPushNotification = (onNewAction) => {
  console.log('On startListenOpeningPushNotification');
  AppState.addEventListener('change', handleAppStateChange(onNewAction));

  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: (registrationData) => onNewAction({ registrationData, }),

    // (required) Called when a remote or local notification is opened or received
    onNotification: (notificationData) => {
      notificationData.finish(PushNotificationIOS.FetchResult.NoData);
      onNewAction({ notificationData, });
    },

    // ANDROID ONLY: GCM or FCM Sender ID (product_number)
    // (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: '533529380557',

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true
  });
};

const stopListenOpeningPushNotification = () => {
  console.log('On stopListenOpeningPushNotification');
  AppState.removeEventListener('change', handleAppStateChange(() => { }));

  return PushNotification.unregister();
};

const openingPushNotificationChannel = () => eventChannel((emit) => {
  const callback = data => emit(data);

  const listener = startListenOpeningPushNotification(callback);

  return () => stopListenOpeningPushNotification(callback);
});

function* listenOpeningPushNotification() {
  console.log(`[listenOpeningPushNotification]: Start listen opening push notifications`);
  const channel = yield call(openingPushNotificationChannel);

  yield put(fetchNewsList());
  yield clearNotifications();

  yield takeEvery(
    channel,
    function* (newActionData) {
      yield clearNotifications();
      yield put(fetchNewsList());

      console.log('[listenOpeningPushNotification]: newActionData: ', newActionData);
      const { registrationData, notificationData, appStateData, } = newActionData;

      if (appStateData) {
        console.log('App state changed');

      } else if (registrationData) {
        console.log('[listenOpeningPushNotification]: New registrationData: ', registrationData);
        yield put(actions.onNewDeviceNotificationToken(registrationData.token));
        yield setNotificationData(registrationData.token);

      } else if (notificationData) {
        let newsId = null;
        if (notificationData.announcement_id) newsId = notificationData.announcement_id;
        else if (notificationData.payload && notificationData.payload.announcement_id) newsId = notificationData.payload.announcement_id;
        else if (notificationData.data && notificationData.data.announcement_id) newsId = notificationData.data.announcement_id;
        else {
          console.warn('No news ID in notification data: ', notificationData);
        }

        if (newsId) {
          yield put(actions.onNewPushNotification(notificationData));
          // yield put( navigateToNewsDetails( notificationData.announcement_id ));
        }

      } else {
        console.warn('[listenOpeningPushNotification]: Unknown new action: ', newActionData);
      }

      yield clearNotifications();
    }
  );

  yield take(STOP_LISTEN_PUSH_NOTIFICATION);
  console.log('[listenOpeningPushNotification]: Stop listening for receiving Push Notifications');
  channel.close();
  yield put(actions.stopListenPushNotificationSuccess());
};


export function* badApiToken() {
  try {
    yield clearNotifications();
    yield logout();
    navigationActions.reset(routeNames.login);
  } catch (err) {
    console.log(err.message);
  }
}


function* init() {
  try {
    const isAuth = yield authInit();

    if (isAuth) {
      yield userInit();
      yield newsInit();
      navigationActions.reset(routeNames.newsList);
      yield put(actions.startListenPushNotification());

    } else yield badApiToken();

    yield clearNotifications();

    yield put(actions.initAppSuccess());
  } catch (err) {
    yield put(actions.initAppError(err.message));
  }
}


export function* fetchLinkInfo({ payload }) {
  try {
    const { email } = payload;

    const result = yield callTmpApi({
      method: 'POST',
      endpoint: "links/menulink/listWithRCInfo?email=" + email,
      payload: {
        email: email
      },
    });

    yield put(actions.saveLinkInfo(result));

  } catch (err) {
    console.log(err);
    // yield put( actions.updateUserProfileError( err.message ));
  }
};

export function* fetchQuickLinkInfo({ payload }) {
  try {
    const { email } = payload;

    const result = yield callTmpApi({
      method: 'POST',
      endpoint: "links/quicklink/listWithRCInfo?email=" + email,
      payload: {
        email: email
      },
    });

    yield put(actions.saveQuickLinkInfo(result));

  } catch (err) {
    console.log(err);
    // yield put( actions.updateUserProfileError( err.message ));
  }
};

export default [
  spawn(init),
  takeLatest(START_LISTEN_PUSH_NOTIFICATION, listenOpeningPushNotification),
  takeLatest(GET_LINK_INFO, fetchLinkInfo),
  takeLatest(GET_QUICK_LINK, fetchQuickLinkInfo)
];
