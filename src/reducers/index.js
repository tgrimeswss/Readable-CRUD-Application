import {
  GET_CATEGORIES,
  SET_CURRENT_CATEGORY,
  GET_POSTS,
  ADD_POST,
  ADD_COMMENT,
  GET_COMMENTS_BY_PARENT,
  COMMENT_VOTE,
  POST_VOTE,
  DELETE_POST,
  DELETE_COMMENT,
  EDIT_COMMENT,
  EDIT_POST,
  SET_POST
} from '../actions'

let initialState = {
  currentPost: {},
  categories: [],
  posts: [],
  comments: []
}

function mapData (state=initialState,action) {
  switch(action.type) {
    case GET_CATEGORIES:
      const {categories} = action.payload
      return {
        ...state,
        categories: categories
      }
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    case SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory:action.category
      }
    case SET_POST:
      return {
        ...state,
        currentPost:action.post
      }
    case ADD_POST:
      console.log({
        ...state,
        posts: [...state.posts,action.payload]})
      return {
        ...state,
        posts: [...state.posts,action.payload]
      }
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
        posts: [...state.posts.filter((thisPost)=> thisPost.deleted === false)]
      }
    case DELETE_COMMENT:
      return {
        ...state,
        comments: [...state.comments.filter((thisComment)=> thisComment.deleted === false)]
      }
    case EDIT_COMMENT:
      return {
        ...state,
        comments: [...state.comments]
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

export default mapData
