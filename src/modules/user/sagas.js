
import { put, takeLatest, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';

import { callApi, callTmpApi, endpoints } from ':global/api';
import routeNames from ':global/routeNames';
import * as navigationActions from ':navigation/NavigationHelper';

import {
  UPDATE_USER_PROFILE,
  SAVE_USER_DATA,
  INIT,
} from './actionTypes';
import { setAppIsLoading } from ':module_app/actionCreators';
import * as actions from './actionCreators';


function* storeUserData( email, revId, fullName, companyName ) {
  yield AsyncStorage.setItem( 'email', JSON.stringify( email ));
  yield AsyncStorage.setItem( 'revId', JSON.stringify( revId ));
  yield AsyncStorage.setItem( 'fullName', JSON.stringify( fullName ));
  yield AsyncStorage.setItem( 'companyName', JSON.stringify( companyName ));
}
function* clearUserData() {
  yield AsyncStorage.multiRemove([ 'email', 'revId', 'fullName', 'companyName' ]);
}
function* getStoredUserData() {
  try {
    const email = JSON.parse( yield AsyncStorage.getItem('email'));
    const revId = JSON.parse( yield AsyncStorage.getItem('revId'));
    const fullName = JSON.parse( yield AsyncStorage.getItem('fullName'));
    const companyName = JSON.parse( yield AsyncStorage.getItem('companyName'));

    if( email && email.length > 0 && revId && revId.length > 0 )
      return { email, revId, fullName, companyName, };
    else return false;

  } catch( err ) {
    console.log( err );
    return false;
  }
}



function* fetchUserData() {
  try {
    const {
      email,
      full_name: fullName,
      revel_est_id: revId,
      company_name: companyName,
    } = yield callApi({
      method: 'PATCH',
      endpoint: endpoints.getUserData,
      payload: {},
    });

    yield put( actions.fetchUserDataSuccess( email, revId, fullName, companyName ));

  } catch( err ) {
    console.log( err );
    yield put( actions.fetchUserDataError( err.message ));
  }
};

export function* updateUserProfile({ payload }) {
  try {
    const { revId, fullName, companyName, } = payload;

    yield put( setAppIsLoading( true ));

    const result = yield callApi({
      method: 'PATCH',
      endpoint: endpoints.updateUserData,
      payload: {
        full_name: fullName,
        revel_est_id: revId,
        company_name: companyName,
      },
    });

    if( result.isFail ) {
      const formattedError = {
        revId: result.revel_est_id || [ result.detail ],
        fullName: result.full_name,
        companyName: result.company_name,
      };

      yield put( actions.updateUserProfileBadFieldData(
        formattedError.revId,
        formattedError.fullName,
        formattedError.companyName
      ));

    } else {

      yield fetchUserData();
      yield put( actions.updateUserProfileSuccess( revId, fullName, companyName ));
    }

    yield put( setAppIsLoading( false ));

  } catch( err ) {
    console.log( err );
    yield put( setAppIsLoading( false ));
    yield put( actions.updateUserProfileError( err.message ));
  }
};


export function* init() {
  try {

    yield fetchUserData();
    return true;

  } catch ( err ) {
    console.log( err );
    yield put( actions.initError( err.message ));
    return false;
  }
}


export default [
  takeLatest( INIT, init ),
  takeLatest( UPDATE_USER_PROFILE, updateUserProfile ),
];

