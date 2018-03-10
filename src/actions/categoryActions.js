import {
  GET_CATEGORIES,
  SET_CURRENT_CATEGORY,
} from './actionTypes'

import keys from '../keys'
let TOKEN = keys.TOKEN

//------------------------------------------------------------------------------

let rootUrl = `http://localhost:3001`
let header = {
  Authorization:TOKEN,
  'Content-Type': 'application/json'
}

export function setCurrentCategory(category) {
  return {
    type: SET_CURRENT_CATEGORY,
    category
  }
}
//------------------------------------------------------------------------------

export function fetchCategories() {
  return (dispatch) => {
    fetch(`${rootUrl}/categories`,{headers: header})
    .then((response)=>response.json())
    .then((parsedJSON)=>{
      dispatch({type:GET_CATEGORIES,payload:parsedJSON})
    })
  }
}
