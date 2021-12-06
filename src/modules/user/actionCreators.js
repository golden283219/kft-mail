
import * as actionTypes from './actionTypes';


export const init = () => ({
  type: actionTypes.INIT,
  payload: {},
});
export const initError = ( message, type = 'common' ) => ({
  type: actionTypes.INIT_ERROR,
  payload: {
    type,
    message,
  },
});
export const initSuccess = () => ({
  type: actionTypes.INIT_SUCCESS,
  payload: {},
});


export const fetchUserData = () => ({
  type: actionTypes.FETCH_USER_DATA,
  payload: {},
});
export const fetchUserDataError = ( message, type = 'common' ) => ({
  type: actionTypes.FETCH_USER_DATA_ERROR,
  payload: {
    type,
    message,
  },
});
export const fetchUserDataSuccess = ( email, revId, fullName, companyName ) => ({
  type: actionTypes.FETCH_USER_DATA_SUCCESS,
  payload: {
    email,
    revId,
    fullName,
    companyName,
  },
});

export const updateUserProfile = ( revId, fullName, companyName ) => ({
  type: actionTypes.UPDATE_USER_PROFILE,
  payload: {
    revId,
    fullName,
    companyName,
  },
});

export const updateUserProfileError = ( message, type = 'common' ) => ({
  type: actionTypes.UPDATE_USER_PROFILE_ERROR,
  payload: {
    type,
    message,
  },
});
export const updateUserProfileSuccess = ( revId, fullName, companyName ) => ({
  type: actionTypes.UPDATE_USER_PROFILE_SUCCESS,
  payload: {
    revId,
    fullName,
    companyName,
  },
});
export const updateUserProfileBadFieldData = ( revelEstId, fullName, companyName ) => ({
  type: actionTypes.UPDATE_USER_PROFILE_BAD_FIELD_DATA,
  payload: {
    revelEstId,
    fullName,
    companyName,
  }
});