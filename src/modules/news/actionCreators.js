
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


export const fetchNewsList = ( startIndex = 0, limit = 20 ) => ({
  type: actionTypes.FETCH_NEWS_LIST,
  payload: {
    startIndex,
    limit,
  },
});
export const fetchNewsListError = ( message, type = 'common' ) => ({
  type: actionTypes.FETCH_NEWS_LIST_ERROR,
  payload: {
    type,
    message,
  },
});
export const fetchNewsListSuccess = ( maxIndex, startIndex, limit, newsList ) => ({
  type: actionTypes.FETCH_NEWS_LIST_SUCCESS,
  payload: {
    maxIndex,
    startIndex,
    limit,
    newsList,
  },
});
export const fetchNextPageNewsList = ( limit = 20 ) => ({
  type: actionTypes.FETCH_NEXT_PAGE_NEWS_LIST,
  payload: {
    limit,
  },
});
export const fetchNextPageNewsListError = ( message, type = 'common' ) => ({
  type: actionTypes.FETCH_NEXT_PAGE_NEWS_LIST_ERROR,
  payload: {
    type,
    message,
  },
});
export const fetchNextPageNewsListSuccess = ( maxIndex, startIndex, limit, newsList ) => ({
  type: actionTypes.FETCH_NEXT_PAGE_NEWS_LIST_SUCCESS,
  payload: {
    maxIndex,
    startIndex,
    limit,
    newsList,
  },
});


export const navigateToNewsDetails = ( newsId ) => ({
  type: actionTypes.NAVIGATE_TO_NEWS_DETAILS,
  payload: {
    newsId,
  },
});
export const navigateToNewsDetailsError = ( message, type = 'common' ) => ({
  type: actionTypes.NAVIGATE_TO_NEWS_DETAILS_ERROR,
  payload: {
    type,
    message,
  },
});
export const navigateToNewsDetailsSuccess = ( newsId, newsDetails ) => ({
  type: actionTypes.NAVIGATE_TO_NEWS_DETAILS_SUCCESS,
  payload: {
    newsId,
    newsDetails,
  },
});


export const setNewsReading = ( newsId ) => ({
  type: actionTypes.SET_NEWS_READING,
  payload: {
    newsId,
  },
});
export const setNewsReadingError = ( message, type = 'common' ) => ({
  type: actionTypes.SET_NEWS_READING_ERROR,
  payload: {
    type,
    message,
  },
});
export const setNewsReadingSuccess = ( newsId ) => ({
  type: actionTypes.SET_NEWS_READING_SUCCESS,
  payload: {
    newsId,
  },
});
