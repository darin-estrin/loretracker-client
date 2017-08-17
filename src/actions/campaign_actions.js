import axios from 'axios';
import { browserHistory } from 'react-router';
import { START_CAMPAIGN, FETCH_CAMPAIGN } from './types';

const ROOT_URL = '/api';

export function startCampaign(formProps){
  return function(dispatch) {
    axios.put(`${ROOT_URL}/startCampaign`, formProps, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
        type: START_CAMPAIGN,
        payload: response.data
      });
    })
  }
}

export function getCampaignData(id, type) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/campaigndata`, {
      headers: { authorization: localStorage.getItem('token'), id, type }
    })
    .then(response => {
      dispatch({
        type: FETCH_CAMPAIGN,
        payload: response.data
      })
    })
    .catch((error) => {
      browserHistory.push('/campaigns');
    });
  }
}

export function deleteCampaign(request) {
  return function (dispatch) {
    axios.put(`${ROOT_URL}/deletecampaign`, request, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      browserHistory.push('/campaigns');
      dispatch({
        type: FETCH_CAMPAIGN,
        payload: response.data
      })
    })
  }
}