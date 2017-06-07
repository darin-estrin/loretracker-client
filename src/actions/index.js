import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_MESSAGE,
  GET_USER
} from './types';

const ROOT_URL = 'http://localhost:3090';
//const token = localStorage.getItem('token');

export function signinUser({ email, password }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/profile');
      })
      .catch((err) => {
        dispatch(authError('Email or password are incorrect'));
      });
  }
}

export function signupUser({ name, email, password }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { name, email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/profile');
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

export function signoutUser(){
  localStorage.removeItem('token');
  return { type: UNAUTH_USER }
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message
      })
    });
  }
}

export function getUserData() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/user`,{
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