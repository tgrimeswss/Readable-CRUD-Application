import {
  GET_POSTS,
  GET_SPECIFIC_POSTS,
  ADD_POST,
  POST_VOTE,
  DELETE_POST,
  EDIT_POST,
  SET_POST
} from '../actions/actionTypes'

let initialState = {
  currentPost: {},
  posts: [],
}

export default function postReducer (state=initialState,action) {
  switch(action.type) {

    case GET_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    case GET_SPECIFIC_POSTS:
      return {
        ...state,
        currentPost: action.payload
      }

    case SET_POST:
      return {
        ...state,
        currentPost:action.post
      }
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts,action.payload]
      }

    case POST_VOTE:
      let post = action.payload
      return {
        ...state,
        posts: state.posts.map((prevPost)=>{
          if(prevPost.id===post.id) {
            return post
          }
          return prevPost
        })
      }
    case DELETE_POST:
      return {
        ...state,
        posts: [...state.posts.filter((thisPost)=> thisPost.id !== action.payload.id)]
      }

    case EDIT_POST:
      return {
        ...state,
        posts: [...state.posts]
      }

    default:
      return state
  }
}
