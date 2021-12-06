
import {
  SET_APP_IS_LOADING,

  INIT_APP,
  INIT_APP_ERROR,
  INIT_APP_SUCCESS,

  START_LISTEN_PUSH_NOTIFICATION,
  START_LISTEN_PUSH_NOTIFICATION_ERROR,
  START_LISTEN_PUSH_NOTIFICATION_SUCCESS,
  STOP_LISTEN_PUSH_NOTIFICATION,
  STOP_LISTEN_PUSH_NOTIFICATION_ERROR,
  STOP_LISTEN_PUSH_NOTIFICATION_SUCCESS,
  ON_NEW_DEVICE_NOTIFICATION_TOKEN,
  ON_NEW_PUSH_NOTIFICATION,
  GET_LINK_INFO,
  GET_LINK_INFO_SUCCESS,
  GET_QUICK_LINK,
  GET_QUICK_LINK_SUCCESS,
} from './actionTypes';


export const initApp = () => ({
  type: INIT_APP,
  payload: {},
});
export const initAppError = (message, type = 'common') => ({
  type: INIT_APP_ERROR,
  payload: {
    type,
    message,
  },
});
export const initAppSuccess = () => ({
  type: INIT_APP_SUCCESS,
  payload: {},
});

export const setAppIsLoading = (isLoading) => ({
  type: SET_APP_IS_LOADING,
  payload: {
    isLoading,
  },
});

export const startListenPushNotification = () => ({
  type: START_LISTEN_PUSH_NOTIFICATION,
  payload: {},
});
export const startListenPushNotificationError = (message, type = 'common') => ({
  type: START_LISTEN_PUSH_NOTIFICATION_ERROR,
  payload: {
    type,
    message,
  },
});
export const startListenPushNotificationSuccess = () => ({
  type: START_LISTEN_PUSH_NOTIFICATION_SUCCESS,
  payload: {},
});

export const stopListenPushNotification = () => ({
  type: STOP_LISTEN_PUSH_NOTIFICATION,
  payload: {},
});
export const stopListenPushNotificationError = (message, type = 'common') => ({
  type: STOP_LISTEN_PUSH_NOTIFICATION_ERROR,
  payload: {
    type,
    message,
  },
});
export const stopListenPushNotificationSuccess = () => ({
  type: STOP_LISTEN_PUSH_NOTIFICATION_SUCCESS,
  payload: {},
});
export const onNewDeviceNotificationToken = (notificationToken) => ({
  type: ON_NEW_DEVICE_NOTIFICATION_TOKEN,
  payload: {
    notificationToken,
  },
});
export const onNewPushNotification = (notification) => ({
  type: ON_NEW_PUSH_NOTIFICATION,
  payload: {
    notification,
  },
});

export const fetchLinkInfo = (email) => ({
  type: GET_LINK_INFO,
  payload: {
    email
  }
})

export const saveLinkInfo = (links) => ({
  type: GET_LINK_INFO_SUCCESS,
  payload: {
    links
  }
})

export const fetchQuickLinkInfo = (email) => ({
  type: GET_QUICK_LINK,
  payload: {
    email
  }
})

export const saveQuickLinkInfo = (quickLinks) => ({
  type: GET_QUICK_LINK_SUCCESS,
  payload: {
    quickLinks
  }
})
