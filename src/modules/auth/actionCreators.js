
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
export const initSuccess = ( apiToken, isTokenValid, ) => ({
  type: actionTypes.INIT_SUCCESS,
  payload: {
    apiToken,
    isTokenValid,
  },
});



export const signUp = ( email, password, revelEstId, fullName, companyName ) => ({
  type: actionTypes.SIGN_UP,
  payload: {
    email,
    password,
    revelEstId,
    fullName,
    companyName,
  },
});
export const signUpError = ( message, type = 'common' ) => ({
  type: actionTypes.SIGN_UP_ERROR,
  payload: {
    type,
    message,
  },
});
export const signUpSuccess = ( email, password, revelEstId, fullName, companyName ) => ({
  type: actionTypes.SIGN_UP_SUCCESS,
  payload: {
    email,
    password,
    revelEstId,
    fullName,
    companyName,
  }
});
export const signUpBadFieldData = ( email, password, revelEstId, fullName, companyName ) => ({
  type: actionTypes.SIGN_UP_BAD_FIELD_DATA,
  payload: {
    email,
    password,
    revelEstId,
    fullName,
    companyName,
  }
});


export const login = ( email, password ) => ({
  type: actionTypes.LOGIN,
  payload: {
    email,
    password,
  },
});
export const loginError = ( message, type = 'common' ) => ({
  type: actionTypes.LOGIN_ERROR,
  payload: {
    type,
    message,
  },
});
export const loginSuccess = ( email, password, apiToken ) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: {
    email,
    password,
    apiToken,
  }
});
export const loginBadFieldData = ( email, password ) => ({
  type: actionTypes.LOGIN_BAD_FIELD_DATA,
  payload: {
    email,
    password,
  }
});

export const logout = () => ({
  type: actionTypes.LOGOUT,
  payload: {},
});
export const logoutError = ( message, type = 'common' ) => ({
  type: actionTypes.LOGIN_ERROR,
  payload: {
    type,
    message,
  },
});
export const logoutSuccess = () => ({
  type: actionTypes.LOGOUT_SUCCESS,
  payload: {}
});


export const updatePassword = ( oldPassword, newPassword ) => ({
  type: actionTypes.UPDATE_PASSWORD,
  payload: {
    oldPassword,
    newPassword,
  },
});
export const updatePasswordError = ( message, type = 'common' ) => ({
  type: actionTypes.UPDATE_PASSWORD_ERROR,
  payload: {
    type,
    message,
  },
});
export const updatePasswordSuccess = ( oldPassword, newPassword ) => ({
  type: actionTypes.UPDATE_PASSWORD_SUCCESS,
  payload: {
    oldPassword,
    newPassword,
  },
});
export const updatePasswordBadFieldData = ( oldPassword, newPassword ) => ({
  type: actionTypes.UPDATE_PASSWORD_BAD_FIELD_DATA,
  payload: {
    oldPassword,
    newPassword,
  }
});
