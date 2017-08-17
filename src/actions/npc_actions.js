import axios from 'axios';
import { browserHistory } from 'react-router';
import { ADD_CAMPAIGN_DATA, SHARE_DATA, SHARE_ERROR } from './types';

const ROOT_URL = '/api';

export function addNPC(request) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/addnpc`, request, {
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

export function updateNPC(request) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/updatenpc`, request, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({ 
        type: ADD_CAMPAIGN_DATA,
        payload: response.data
       });
    });
  }
}

export function addNpcNote(request) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/addnpcnote`, request, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
        type: ADD_CAMPAIGN_DATA,
        payload: response.data
      });
    });
  }
}

export function shareNpc(request) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/sharenpc`, request, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({ 
        type: SHARE_DATA,
        payload: response.data.success
      });
    })
    .catch(err => {
      dispatch({
        type: SHARE_ERROR,
        payload: err.response.data.error
      })
    });
  }
}