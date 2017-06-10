import {
  GET_USER,
  START_CAMPAIGN,
  ADD_PLAYER,
  ADD_ERROR,
  FETCH_CAMPAIGN
} from '../actions/types'

export default function(state= {}, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, name: action.payload.name, DMCampaigns: action.payload.campaigns.DM, PCCampaigns: action.payload.campaigns.PC, error: '' }
    case START_CAMPAIGN:
      return { ...state, DMCampaigns: action.payload.campaigns.DM, error: '' }
    case ADD_PLAYER:
      return { ...state, DMCampaigns: action.payload.campaigns.DM, error: '' };
    case ADD_ERROR:
      return { ...state, error: action.payload };
    case FETCH_CAMPAIGN:
      return { ...state, DMCampaign: action.payload };
    default:
      return { ...state };
  }
}