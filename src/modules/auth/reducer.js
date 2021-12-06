
import {
  INIT_SUCCESS,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_BAD_FIELD_DATA,
  UPDATE_PASSWORD_SUCCESS,
  SIGN_UP,
  SIGN_UP_BAD_FIELD_DATA,
  SIGN_UP_SUCCESS,
  LOGIN,
  LOGIN_BAD_FIELD_DATA,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from './actionTypes';


const initialState = {
  isLoading: false,
  apiToken: '',
  signUpValidationBadFields: {},
  loginValidationBadFields: {},
  updatePasswordValidationBadFields: {},
};

export default ( state = initialState, action ) => {
  switch ( action.type ) {
    case INIT_SUCCESS: {
      const { isTokenValid, apiToken, } = action.payload;
      return {
        ...state,
        apiToken: isTokenValid
          ? apiToken
          : '',
      };
    }
    case UPDATE_PASSWORD: {
      return {
        ...state,
        updatePasswordValidationBadFields: {},
      };
    }
    case UPDATE_PASSWORD_SUCCESS: {
      return {
        ...state,
        updatePasswordValidationBadFields: {},
      };
    }
    case UPDATE_PASSWORD_BAD_FIELD_DATA: {
      const { oldPassword, newPassword, } = action.payload;
      return {
        ...state,
        updatePasswordValidationBadFields: {
          oldPassword,
          newPassword,
        },
      };
    }
    case SIGN_UP: {
      return {
        ...state,
        signUpValidationBadFields: {},
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        signUpValidationBadFields: {},
      };
    }
    case SIGN_UP_BAD_FIELD_DATA: {
      const { email, password, revelEstId, fullName, companyName, } = action.payload;
      return {
        ...state,
        signUpValidationBadFields: {
          email,
          password,
          revelEstId,
          fullName,
          companyName,
        },
      };
    }
    case LOGIN: {
      return {
        ...state,
        loginValidationBadFields: {},
      };
    }
    case LOGIN_SUCCESS: {
      const { apiToken, } = action.payload;

      return {
        ...state,
        apiToken,
        loginValidationBadFields: {},
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        apiToken: '',
        loginValidationBadFields: {},
      };
    }
    case LOGIN_BAD_FIELD_DATA: {
      const { email, password, } = action.payload;

      return {
        ...state,
        loginValidationBadFields: {
          email,
          password,
        },
      };
    }
    default:
      return state;
  }
};
