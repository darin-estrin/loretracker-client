// NPM dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

// Components
import App from './components/app';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Profile from './components/auth/profile';
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} >
      <Route path='/' component={App} >
        <Route path='signin' component={Signin} />
        <Route path='signup' component={Signup} />
        <Route path='profile' component={RequireAuth(Profile)} />
      </Route>      
    </Router>
  </Provider>
  , document.querySelector('.container'));
