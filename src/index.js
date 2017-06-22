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
import EditPlayer from './components/auth/edit_player';
import PlayerNotes from './components/auth/player_notes';
import Npcs from './components/auth/npcs';
import EditNpc from './components/auth/edit_npc';
import NpcNotes from './components/auth/npc_note';
import ShareNpc from './components/auth/share_npc';
import Locations from './components/auth/locations';
import EditLocation from './components/auth/edit_locations';
import LocationNotes from './components/auth/location_notes';
import ShareLocation from './components/auth/share_location';
import Lore from './components/auth/lore';
import EditLore from './components/auth/edit_lore';
import LoreNotes from './components/auth/lore_notes';
import ShareLore from './components/auth/share_lore';
import RequireAuth from './components/auth/require_auth';
import Profile from './components/auth/profile';
import ChangePassword from './components/auth/change_password';
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
        <Route path='campaigns/:type/:id/roster/:player' component={RequireAuth(EditPlayer)} />
        <Route path='campaigns/:type/:id/roster/:player/notes'
        component={RequireAuth(PlayerNotes)} />
        <Route path='campaigns/:type/:id/npcs' component={RequireAuth(Npcs)} />
        <Route path='campaigns/:type/:id/npcs/:npc' component={RequireAuth(EditNpc)} />
        <Route path='campaigns/:type/:id/npcs/:npc/notes' component={RequireAuth(NpcNotes)} />
        <Route path='campaigns/:type/:id/npcs/:npc/share' component={RequireAuth(ShareNpc)} />
        <Route path='campaigns/:type/:id/locations' component={RequireAuth(Locations)} />
        <Route path='campaigns/:type/:id/locations/:location'
        component={RequireAuth(EditLocation)} />
        <Route path='campaigns/:type/:id/locations/:location/notes'
        component={RequireAuth(LocationNotes)} />
        <Route path='campaigns/:type/:id/locations/:location/share'
        component={RequireAuth(ShareLocation)} />
        <Route path='campaigns/:type/:id/lore' component={RequireAuth(Lore)} />
        <Route path='campaigns/:type/:id/lore/:lore' component={RequireAuth(EditLore)} />
        <Route path='campaigns/:type/:id/lore/:lore/notes' component={RequireAuth(LoreNotes)} />
        <Route path='campaigns/:type/:id/lore/:lore/share' component={RequireAuth(ShareLore)} />
        <Route path='profile' component={RequireAuth(Profile)} />
        <Route path='changepassword' component={RequireAuth(ChangePassword)} />
        <Route path='*' component={PageNotFound} />
      </Route>      
    </Router>
  </Provider>
  , document.getElementById('root'));
