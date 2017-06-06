import { GET_USER } from '../actions/types'

export default function(state= {}, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, userID: action.payload };
    default:
      return state;
  }
}