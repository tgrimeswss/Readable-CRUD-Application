import {
  GET_CATEGORIES,
  GET_POSTS,
  ADD_POST,
  GET_COMMENTS_BY_PARENT
} from '../actions'

let initialState = {
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
    case ADD_POST:
      return {

      }
    case GET_COMMENTS_BY_PARENT:
      console.log('test')
      return {
        ...state,
      }
    default:
      return state
  }
}

export default mapData
