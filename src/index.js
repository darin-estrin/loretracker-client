// NPM dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

// Source dempendencies
import App from './components/app';
import Home from './components/home';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Campaigns from './components/auth/campaigns';
import PageNotFound from './components/pageNotFound';
import Roster from './components/auth/roster';
import Npcs from './components/auth/npcs';
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path='/' component={App} >
        <IndexRoute component={Home} />
        <Route path='signin' component={Signin} />
        <Route path='signup' component={Signup} />
        <Route path='campaigns' component={RequireAuth(Campaigns)} />
        <Route path='campaigns/:type/:id/roster' component={RequireAuth(Roster)} />
        <Route path='campaigns/:type/:id/npcs' component={RequireAuth(Npcs)} />
        <Route path='*' component={PageNotFound} />
      </Route>      
    </Router>
  </Provider>
  , document.getElementById('root'));
