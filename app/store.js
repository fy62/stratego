import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';

import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export default createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger({collapsed: true})
  )
);
