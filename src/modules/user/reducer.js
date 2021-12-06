
import {
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_BAD_FIELD_DATA,
  FETCH_USER_DATA_SUCCESS,
  INIT_SUCCESS,
} from './actionTypes';


const initialState = {
  isLoading: false,
  email: '',
  revId: '',
  fullName: '',
  companyName: '',
  updateProfileValidationBadFields: {}
};

export default ( state = initialState, action ) => {
  switch ( action.type ) {
    case UPDATE_USER_PROFILE: {
      return {
        ...state,
        updateProfileValidationBadFields: {},
      };
    }
    case UPDATE_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        updateProfileValidationBadFields: {},
      };
    }
    case UPDATE_USER_PROFILE_BAD_FIELD_DATA: {
      const { revId, fullName, companyName, } = action.payload;
      return {
        ...state,
        updateProfileValidationBadFields: {
          revId,
          fullName,
          companyName,
        },
      };
    }
    case FETCH_USER_DATA_SUCCESS: {
      const { email, revId, fullName, companyName, } = action.payload;
      return {
        ...state,
        email,
        revId,
        fullName,
        companyName,
      };
    }
    case INIT_SUCCESS: {
      const { email, revId, fullName, companyName, } = action.payload;
      return {
        ...state,
        email,
        revId,
        fullName,
        companyName,
      };
    }
    default:
      return state;
  }
};
