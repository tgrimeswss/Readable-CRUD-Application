import {
  GET_CATEGORIES,
  ADD_POST,
  DELETE_POST,
  ADD_COMMENT,
  DELETE_COMMENT
} from '../actions'

let initialState = {}

function mapData (state=initialState,action) {
  switch(action.type) {
    case GET_CATEGORIES:
      return {}
    case ADD_POST:
      return {}
      case DELETE_POST:
        return {}
      case ADD_COMMENT:
        return {}
      case DELETE_COMMENT:
        return {}
      default:
        return state
  }
}

export default mapData
