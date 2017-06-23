import axios from 'axios';
import { browserHistory } from 'react-router';
import { ADD_CAMPAIGN_DATA, SHARE_DATA } from './types';

const ROOT_URL = 'http://localhost:3090/api';

export function addLocation(request) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/addlocation`, request, {
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

export function updateLocation(request) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/updatelocation`, request, {
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

export function addLocationNote(request) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/addlocationnote`, request, {
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

export function shareLocation(request) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/sharelocation`, request, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({ 
        type: SHARE_DATA,
        payload: response.data.success
      });
    })
  }
}