
import { getUniqueItems } from ':global/utils';

import {
  FETCH_NEWS_LIST,
  FETCH_NEWS_LIST_SUCCESS,
  FETCH_NEWS_LIST_ERROR,
  FETCH_NEXT_PAGE_NEWS_LIST,
  FETCH_NEXT_PAGE_NEWS_LIST_SUCCESS,
  FETCH_NEXT_PAGE_NEWS_LIST_ERROR,
  NAVIGATE_TO_NEWS_DETAILS,
  NAVIGATE_TO_NEWS_DETAILS_SUCCESS,
  NAVIGATE_TO_NEWS_DETAILS_ERROR,
  INIT_SUCCESS,
} from './actionTypes';


const initialState = {
  isLoading: false,

  maxNewsIndex: -1,
  currentNewsIndex: -1,
  newsList: [],
  newsDetails: null,
};

export default ( state = initialState, action ) => {
  switch ( action.type ) {
    case NAVIGATE_TO_NEWS_DETAILS: {
      return {
        ...state,
        isLoading: true,
        newsDetails: null
      };
    }
    case NAVIGATE_TO_NEWS_DETAILS_ERROR: {
      return {
        ...state,
        isLoading: false,
        newsDetails: null,
      };
    }
    case NAVIGATE_TO_NEWS_DETAILS_SUCCESS: {
      const { newsDetails, } = action.payload;
      return {
        ...state,
        isLoading: false,
        newsDetails,
      };
    }

    case FETCH_NEWS_LIST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_NEWS_LIST_SUCCESS: {
      const { maxIndex, startIndex, limit, newsList, } = action.payload;
      return {
        ...state,
        isLoading: false,
        maxNewsIndex: maxIndex,
        currentNewsIndex: startIndex,
        newsList: startIndex === limit
          ? newsList
          : getUniqueItems([
          ...state.newsList,
          ...newsList,
        ])
      };
    }
    case FETCH_NEWS_LIST_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case FETCH_NEXT_PAGE_NEWS_LIST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_NEXT_PAGE_NEWS_LIST_SUCCESS: {
      const { maxIndex, startIndex, limit, newsList, } = action.payload;
      return {
        ...state,
        isLoading: false,
        maxNewsIndex: maxIndex,
        currentNewsIndex: startIndex,
        newsList: getUniqueItems([
          ...state.newsList,
          ...newsList,
        ])
      };
    }
    case FETCH_NEXT_PAGE_NEWS_LIST_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
