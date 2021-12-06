
import { put, takeLatest, select } from 'redux-saga/effects';
import { Alert, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { callApi, endpoints } from ':global/api';
import routeNames from ':global/routeNames';
import * as navigationActions from ':navigation/NavigationHelper';

import {
  UPDATE_PASSWORD,
  SIGN_UP,
  LOGIN,
  LOGOUT,
  INIT,
} from './actionTypes';
import { setAppIsLoading, startListenPushNotification, stopListenPushNotification, } from ':module_app/actionCreators';
import { init as userInit, } from ':module_user/sagas';
import { init as newsInit } from ':module_news/sagas';
import * as actions from './actionCreators';
import { reset } from "../../navigation/NavigationHelper";


function* storeAuthData( token ) {
  yield AsyncStorage.setItem( 'token', JSON.stringify( token ));
}
export function* clearAuthData() {
  yield AsyncStorage.removeItem('token');
}
function* getStoredAuthData() {
  try {
    const token = JSON.parse( yield AsyncStorage.getItem('token'));

    if( token && token.length > 0 ) return { token, };
    else return false;

  } catch( err ) {
    console.log( err );
    return false;
  }
}

function* validateApiToken( apiToken ) {
  try {
    // If token wrong, this call return http 401 and goes to "catch" section
    yield callApi({
      method: 'PATCH',
      endpoint: endpoints.getUserData,
      token: apiToken,
      payload: {},
    });

    return ( apiToken && apiToken.length > 0 );

  } catch( err ) {
    console.log( err );
    return false;
  }
};



function* signUp({ payload }) {
  try {
    const {
      email,
      password,
      revelEstId,
      fullName,
      companyName,
    } = payload;

    yield put( setAppIsLoading( true ));

    const result = yield callApi({
      method: 'POST',
      endpoint: endpoints.signUp,
      payload: {
        email,
        full_name: fullName,
        revel_est_id: revelEstId,
        company_name: companyName,
        new_password: password,
      },
    });

    yield put( setAppIsLoading( false ));

    if( result.isFail ) {
      const formattedError = {
        email: result.email,
        password: result.new_password,
        revelEstId: result.revel_est_id,
        fullName: result.full_name,
        companyName: result.company_name,
      };

      yield put( actions.signUpBadFieldData(
          formattedError.email,
          formattedError.password,
          formattedError.revelEstId,
          formattedError.fullName,
          formattedError.companyName
        ));
    } else {

      yield put( actions.signUpSuccess( email, password, revelEstId, fullName, companyName ));

      // If user sign up success, so, let's login
      yield put( actions.login( email, password ));
    }

  } catch( err ) {
    console.log( err );
    yield put( actions.signUpError( err.message ));
    yield put( setAppIsLoading( false ));
    Alert.alert(
      'Error',
      'Something went wrong. Please try later',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {
        cancelable: false,
      },
    );
  }
};


function* updatePassword({ payload }) {
  try {
    const {
      oldPassword,
      newPassword,
    } = payload;

    yield put( setAppIsLoading( true ));

    const result = yield callApi({
      method: 'PUT',
      endpoint: endpoints.changePassword,
      payload: {
        old_password: oldPassword,
        password1: newPassword,
        password2: newPassword,
      },
    });

    yield put( setAppIsLoading( false ));

    if( result.isFail ) {
      const formattedError = {
        oldPassword: result.old_password,
        newPassword: result.password1,
      };

      yield put( actions.updatePasswordBadFieldData(
          formattedError.oldPassword,
          formattedError.newPassword,
        ));
    } else {
      yield put( actions.updatePasswordSuccess( oldPassword, newPassword ));
      navigationActions.goBack();
    }

  } catch( err ) {
    console.log( err );
    yield put( actions.updatePasswordError( err.message ));
    yield put( setAppIsLoading( false ));
    Alert.alert(
      'Error',
      'Something went wrong. Please try later',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {
        cancelable: false,
      },
    );
  }
};



function* login({ payload }) {
  try {
    const {
      email,
      password,
    } = payload;

    yield put( setAppIsLoading( true ));

    const {
      isFail,
      email: emailError,
      password: passwordError,
      detail: otherError,
      token,
    } = yield callApi({
      method: 'POST',
      endpoint: endpoints.login,
      payload: {
        email,
        password,
      },
    });


    if( isFail ) {
      if( otherError && otherError.length > 0 ) {
        Alert.alert(
          'Error',
          otherError,
          [
            { text: 'OK', onPress: () => {}},
          ],
          {
            cancelable: false,
          },
        );
      }

      if( emailError || passwordError ) {
        yield put( actions.loginBadFieldData(
          emailError,
          passwordError
        ));
      }

    } else {
      yield storeAuthData( token );

      yield put( actions.loginSuccess( email, password, token ));
      yield userInit();
      yield newsInit();

      navigationActions.reset( routeNames.newsList );
      yield put( startListenPushNotification());
    }

    yield put( setAppIsLoading( false ));

  } catch( err ) {
    console.log( err );
    yield put( actions.loginError( err.message ));
    yield put( setAppIsLoading( false ));
    Alert.alert(
      'Error',
      'Something went wrong. Please try later',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {
        cancelable: false,
      },
    );
  }
};


export function* logout() {
  try {
    yield put( setAppIsLoading( true ));

    yield clearAuthData();

    yield put( actions.logoutSuccess());

    yield put( setAppIsLoading( false ));

    navigationActions.reset( routeNames.login );
    yield put( stopListenPushNotification());

  } catch( err ) {
    console.log( err );
    yield put( actions.logoutError( err.message ));
    yield put( setAppIsLoading( false ));
  }
};


export function* init() {
  try {
    const { token, } = yield getStoredAuthData();

    let isApiTokenValid = false;
    if( token ) {
      isApiTokenValid = yield validateApiToken( token );
      if( !isApiTokenValid ) yield clearAuthData();
    }

    yield put( actions.initSuccess( token, isApiTokenValid ));

    return isApiTokenValid;

  } catch ( err ) {
    console.log( err );
    yield put( actions.initError( err.message ));
    return false;
  }
}


export default [
  takeLatest( INIT, init ),
  takeLatest( UPDATE_PASSWORD, updatePassword ),
  takeLatest( SIGN_UP, signUp ),
  takeLatest( LOGIN, login ),
  takeLatest( LOGOUT, logout ),
];
