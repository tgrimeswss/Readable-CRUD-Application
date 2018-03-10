import {
  GET_CATEGORIES,
  SET_CURRENT_CATEGORY,
} from '../actions/actionTypes'

let initialState = {
  currentCategory:'',
  categories: []
}

export default function categoryReducer (state=initialState,action) {
  switch(action.type) {

    case GET_CATEGORIES:
      const {categories} = action.payload
      return {
        ...state,
        categories: categories
      }

    case SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory:action.category
      }

    default:
      return state
  }
}
