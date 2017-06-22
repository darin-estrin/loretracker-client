import { 
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  CLEAR_ERRORS,
  FETCH_PROFILE
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, error: '', authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_ERRORS:
      return { ...state, error: '' };
    case FETCH_PROFILE:
      return { ...state, user: action.payload}
    default:
      return { ...state };
  }
}