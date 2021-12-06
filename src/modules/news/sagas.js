
import { put, takeLatest, select } from 'redux-saga/effects';

import { callApi, endpoints } from ':global/api';
import routeNames from ':global/routeNames';
import * as navigationActions from ':navigation/NavigationHelper';

import {
  FETCH_NEWS_LIST,
  FETCH_NEXT_PAGE_NEWS_LIST,
  NAVIGATE_TO_NEWS_DETAILS,
  SET_NEWS_READING,
  INIT,
} from './actionTypes';
import { setAppIsLoading } from ':module_app/actionCreators';
import * as actions from './actionCreators';


function* getNewsList( startFrom, limit ) {
  return yield callApi({
    method: 'GET',
    endpoint: endpoints.fetchNewsList,
    queryArgsTemplate: ({ offset, limit }) => `offset=${offset}&limit=${limit}`,
    payload: {
      offset: startFrom,
      limit,
    },
  });
}

function* fetchNewsList({ payload }) {
  try {
    const { startIndex, limit, } = payload;

    const { count, next, previous, results, } = yield getNewsList( startIndex, limit );

    yield put( actions.fetchNewsListSuccess( count, startIndex + limit, limit, results ));

  } catch( err ) {
    console.log( err );
    yield put( actions.fetchNewsListError( err.message ));
  }
};

function* fetchNextPageNewsList({ payload }) {
  try {
    const { limit, } = payload;

    const {
      maxNewsIndex: rawMaxNewsIndex,
      currentNewsIndex: rawCurrentNewsIndex,
    } = yield select(({ news }) => news );

    let currentNewsIndex = 0;
    if( rawCurrentNewsIndex > -1 ) currentNewsIndex = rawCurrentNewsIndex;

    let maxNewsIndex = 0;
    if( rawMaxNewsIndex > -1 ) maxNewsIndex = rawMaxNewsIndex;

    if( currentNewsIndex >= maxNewsIndex ) {
      yield put( actions.fetchNextPageNewsListSuccess( maxNewsIndex, currentNewsIndex, limit, [] ));
    } else {
      const { count, next, previous, results, } = yield getNewsList( currentNewsIndex, limit );
      yield put( actions.fetchNextPageNewsListSuccess( count, currentNewsIndex + limit, limit, results ));
    }

  } catch( err ) {
    console.log( err );
    yield put( actions.fetchNextPageNewsListError( err.message ));
  }
};

function* navigateToNewsDetails({ payload }) {
  try {
    const { newsId, } = payload;

    yield put( setAppIsLoading( true ));

    const newsData = yield callApi({
      method: 'GET',
      endpoint: endpoints.fetchNewsDetails,
      payload: {
        newsId,
      },
    });

    yield put( actions.navigateToNewsDetailsSuccess( newsId, newsData ));

    navigationActions.navigate( routeNames.newsDetails );

    yield put( setAppIsLoading( false ));

  } catch( err ) {
    yield put( setAppIsLoading( false ));
    yield put( actions.navigateToNewsDetailsError( err.message ));
  }
};



function* setNewsReading({ payload }) {
  try {
    const { newsId, } = payload;

    yield callApi({
      method: 'GET',
      endpoint: endpoints.setNewsReading,
      payload: {
        newsId,
      },
    });

    yield put( actions.setNewsReadingSuccess( newsId ));

  } catch( err ) {
    yield put( actions.setNewsReadingError( err.message ));
  }
};



export function* init() {
  try {
    yield fetchNewsList({ payload: { startIndex: 0, limit: 20, }});
    return true;

  } catch ( err ) {
    console.log( err );
    yield put( actions.initError( err.message ));
    return false;
  }
}


export default [
  takeLatest( INIT, init ),
  takeLatest( FETCH_NEWS_LIST, fetchNewsList ),
  takeLatest( FETCH_NEXT_PAGE_NEWS_LIST, fetchNextPageNewsList ),
  takeLatest( NAVIGATE_TO_NEWS_DETAILS, navigateToNewsDetails ),
  takeLatest( SET_NEWS_READING, setNewsReading ),
];
