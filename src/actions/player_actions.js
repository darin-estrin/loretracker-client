import axios from 'axios';
import { browserHistory } from 'react-router';
import { ADD_CAMPAIGN_DATA, FETCH_ERROR, FETCH_FORM_ITEM } from './types';

const ROOT_URL = '/api';

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
    });
  }
}

export function addPlayerNote(request) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/addplayernote`, request, {
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

export function fetchError(error) {
  return {
    type: FETCH_ERROR,
    payload: error
  };
}

export function deletePlayer(campaign, player, id, type) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/deleteplayer`, { campaign, player }, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      browserHistory.push(`/campaigns/${type}/${id}/roster`);
      dispatch({
        type: ADD_CAMPAIGN_DATA,
        payload: response.data
      });
    });
  }
}

export function editPlayerNote(data) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/editnote`, { data }, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
        type: ADD_CAMPAIGN_DATA,
        payload: response.data
      })
    })
  }
}

export function deletePlayerNote() {

}