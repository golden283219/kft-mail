
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const enhancer = compose(
  applyMiddleware( sagaMiddleware ),
  global.reduxNativeDevTools
    ? global.reduxNativeDevTools({ name: 'wibedo' })
    : nope => nope,
);
const store = createStore( reducers, enhancer );
sagaMiddleware.run( sagas );

export default store;
