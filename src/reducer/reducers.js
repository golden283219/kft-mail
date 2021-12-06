
import { combineReducers } from 'redux';

import app from ':module_app/reducer';
import auth from ':module_auth/reducer';
import user from ':module_user/reducer';
import news from ':module_news/reducer';
import navigation from ':navigation/reducer';

export default combineReducers({
  app,
  auth,
  user,
  news,
  navigation,
});
