import * as React from 'react';
import { render } from 'react-dom';
import {Router, Route, Switch} from 'react-router-dom'
import {createBrowserHistory} from "history";
import { Provider } from 'react-redux';
import store from './store';
import MainView from './components/main/main';
var hist = createBrowserHistory();

document.title = "Cosmicrafts";

render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/" component={MainView}></Route>
      </Switch>
    </Router>
  </Provider>, 
  document.getElementById("root")
);