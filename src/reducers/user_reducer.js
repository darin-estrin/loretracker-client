import { GET_USER, START_CAMPAIGN, ADD_PLAYER } from '../actions/types'

export default function(state= {}, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, name: action.payload.name, DMCampaigns: action.payload.campaigns.DM, PCCampaigns: action.payload.campaigns.PC }
    case START_CAMPAIGN:
      console.log('payload', action.payload.campaigns.DM);
      return { ...state, DMCampaigns: action.payload.campaigns.DM }
    case ADD_PLAYER:
      return { ...state };
    default:
      return { ...state };
  }
}