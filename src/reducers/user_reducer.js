import { GET_USER, START_CAMPAIGN } from '../actions/types'

export default function(state= {}, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, name: action.payload.name, DMCampaigns: action.payload.campaigns.DM, PCCampaigns: action.payload.campaigns.PC }
    case START_CAMPAIGN:
      return { ...state, DMCampaigns: action.payload }
    default:
      return { ...state };
  }
}