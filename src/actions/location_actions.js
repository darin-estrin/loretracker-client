import axios from 'axios';
import { browserHistory } from 'react-router';
import { ADD_CAMPAIGN_DATA, SHARE_DATA, SHARE_ERROR, FETCH_FORM_ITEM, RESET_INITIAL_VALUES } from './types';

const ROOT_URL = '/api';

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
    .catch(err => {
      dispatch({
        type: SHARE_ERROR,
        payload: err.response.data.error
      })
    });
  }
}

export function fetchLocation(id, location) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/location`, {
      headers: { authorization: localStorage.getItem('token'), id, location }
    })
    .then(response => {
      dispatch({
        type: FETCH_FORM_ITEM,
        payload: response.data
      })
    });
  }
}