import React from 'react';
import { Router, Route, hashHistory, IndexRedirect, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import axios from 'axios';
import store from './store';
import {getPlayers} from './reducer';

import Choose from './Choose';
import App from './App';
import Play from './Play';
import Setup from './Setup';

const onChooseEnter = function (nextRouterState) {
  store.dispatch(getPlayers());
};

export default () => {
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
      <Route path="/" component={Choose} onEnter={onChooseEnter}></Route>
        <Route path="/waiting" component={App}></Route>
        <Route path="/redplay" component={Play}></Route>
        <Route path="/blueplay" component={Play}></Route>
        <Route path="/redsetup" component={Setup}></Route>
        <Route path="/bluesetup" component={Setup}></Route>
      </Router>
    </Provider>
  );
}
