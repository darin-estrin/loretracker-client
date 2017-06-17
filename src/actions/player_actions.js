import axios from 'axios';
import { browserHistory } from 'react-router';
import { ADD_CAMPAIGN_DATA, FETCH_ERROR } from './types';

const ROOT_URL = 'http://localhost:3090';

export function addPlayer(request) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/addPlayer`, request, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
        type: ADD_CAMPAIGN_DATA,
        payload: response.data
      });
    })
    .catch(error => dispatch(fetchError(error.response.data.error)));
  }
}

export function updatePlayer(request) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/updateplayer`, request, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
        type: ADD_CAMPAIGN_DATA,
        payload: response.data
      });
    })
  }
}

export function fetchError(error) {
  return {
    type: FETCH_ERROR,
    payload: error
  };
}