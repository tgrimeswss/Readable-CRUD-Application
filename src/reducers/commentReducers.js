import {
  ADD_COMMENT,
  GET_COMMENTS_BY_PARENT,
  COMMENT_VOTE,
  DELETE_COMMENT,
  EDIT_COMMENT
} from '../actions/actionTypes'

let initialState = {
  comments: []
}

export default function commentReducer(state=initialState,action) {
  switch(action.type) {

    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments,action.payload]
      }
    case GET_COMMENTS_BY_PARENT:
      return {
        ...state,
        comments: action.payload
      }
    case COMMENT_VOTE:
      let comment = action.payload
      return {
        ...state,
        comments: state.comments.map((prevComment)=>{
          if(prevComment.id===comment.id) {
            return comment
          }
          return prevComment
        })
      }
    case DELETE_COMMENT:
      return {
        ...state,
        comments: [...state.comments.filter((thisComment)=> thisComment.id !== action.payload.id)]
      }
    case EDIT_COMMENT:
      return {
        ...state,
        comments: [...state.comments]
      }

    default:
      return state
  }
}
