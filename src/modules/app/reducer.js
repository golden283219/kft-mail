
import { SET_APP_IS_LOADING, INIT_APP, INIT_APP_SUCCESS, INIT_APP_ERROR, GET_LINK_INFO_SUCCESS, GET_QUICK_LINK_SUCCESS, } from './actionTypes';


const initialState = {
  isLoading: false,
  links: { Links: [] },
  quickLinks: { Links: [] }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_IS_LOADING: {
      const { isLoading } = action.payload;
      return {
        ...state,
        isLoading,
      };
    }
    case INIT_APP: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case INIT_APP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case INIT_APP_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case GET_LINK_INFO_SUCCESS: {
      const { links } = action.payload
      return {
        ...state,
        links
      }
    }
    case GET_QUICK_LINK_SUCCESS: {
      const { quickLinks } = action.payload
      return {
        ...state,
        quickLinks
      }
    }

    default:
      return state;
  }
};
