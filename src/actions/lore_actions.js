import axios from 'axios';
import { browserHistory } from 'react-router';
import { ADD_CAMPAIGN_DATA, SHARE_DATA, SHARE_ERROR, FETCH_FORM_ITEM, RESET_INITIAL_VALUES } from './types';

const ROOT_URL = '/api';

export function addLore(request) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/addlore`, request, {
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

export function updateLore(request) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/updatelore`, request, {
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

export function addLoreNote(request) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/addlorenote`, request, {
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

export function shareLore(request) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/sharelore`, request, {
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

export function fetchLoreItem(id, lore) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/loreitem`, {
      headers: { authorization: localStorage.getItem('token'), id, lore }
    })
    .then(response => {
      dispatch({
        type: FETCH_FORM_ITEM,
        payload: response.data
      })
    });
  }
}

export function resetCurrentLoreItem() {
  console.log('resetting');
  return {
    type: RESET_INITIAL_VALUES
  }
}