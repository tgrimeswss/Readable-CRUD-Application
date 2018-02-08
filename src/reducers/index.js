import {
  ADD_POST,
  DELETE_POST,
  ADD_COMMENT,
  DELETE_COMMENT
} from '../actions'

function mapData (state={},action) {
  switch(action.type) {
    case ADD_POST:
      return {}
      case DELETE_POST:
        return {}
      case ADD_COMMENT:
        return {}
      case DELETE_COMMENT:
        return {}
  }
}

export default mapData
