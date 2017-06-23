import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  GET_USER,
  CLEAR_ERRORS,
  FETCH_PROFILE
} from './types';

const ROOT_URL = '/api';

export function signinUser({ email, password }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/campaigns');
      })
      .catch((err) => {
        dispatch(authError('Email or password are incorrect'));
      });
  }
}

export function getUser() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/`, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
        type: FETCH_PROFILE,
        payload: response.data
      })
    })
  }
}

export function signupUser({ name, email, password, phone }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { name, email, password, phone })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/campaigns');
      })
      .catch(error => dispatch(authError(error.response.data.error)));
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function clearError() {
  return {
    type: CLEAR_ERRORS
  }
}

export function signoutUser(){
  localStorage.removeItem('token');
  return { type: UNAUTH_USER }
}

export function getUserData() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/user`, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
        type: GET_USER,
        payload: response.data
      })
    })
  }
}

export function updateProfile(values) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/updateprofile`, values, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({ type: AUTH_USER });
      browserHistory.push('/campaigns');
    })
    .catch(error => dispatch(authError(error.response.data.error)));
  }
}

export function changePassword(values) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/changepassword`, values, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/campaigns');
    })
  }
}