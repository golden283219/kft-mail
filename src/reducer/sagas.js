
import { all } from 'redux-saga/effects';

import app from ':module_app/sagas';
import auth from ':module_auth/sagas';
import user from ':module_user/sagas';
import news from ':module_news/sagas';

export default function* sagas() {
  yield all([
    app,
    auth,
    user,
    news,
  ].reduce(( allSagas, sagas ) => allSagas.concat( sagas ), []));
}
