import {
  GET_USER,
  START_CAMPAIGN,
  ADD_CAMPAIGN_DATA,
  FETCH_ERROR,
  FETCH_CAMPAIGN,
  UNAUTH_USER,
  SHARE_DATA
} from '../actions/types'

export default function(state= {}, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, name: action.payload.name, DMCampaigns: action.payload.campaigns.DM, PCCampaigns: action.payload.campaigns.PC, error: '', success: '' }
    case START_CAMPAIGN:
      return { ...state, DMCampaigns: action.payload.campaigns.DM, error: '', success: '' }
    case ADD_CAMPAIGN_DATA:
      return { ...state, Campaign: action.payload, error: '', success: '' };
    case FETCH_ERROR:
      return { ...state, error: action.payload, success: '' };
    case FETCH_CAMPAIGN:
      return { ...state, Campaign: action.payload, error: '', success: '' };
    case SHARE_DATA: {
      return { ...state, success: action.payload, error: '' };
    }
    case UNAUTH_USER:
      return { ...state, name: '', DMCampaigns: '', PCCampaigns: '', error: '', Campaign: '', success: '' }
    default:
      return { ...state };
  }
}