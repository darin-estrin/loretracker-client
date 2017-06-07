import { GET_USER } from '../actions/types'

export default function(state= {}, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, name: action.payload.name }
    default:
      return { ...state };
  }
}