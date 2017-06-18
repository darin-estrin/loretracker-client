import axios from 'axios';
import { browserHistory } from 'react-router';
import { ADD_CAMPAIGN_DATA } from './types';

const ROOT_URL = 'http://localhost:3090';

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
    .catch(error => console.log(error));
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