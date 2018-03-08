import keys from '../keys'
const uuidv1 = require('uuid/v1')
const timeStamp = require('time-stamp')
let TOKEN = keys.TOKEN
//------------------------------------------------------------------------------
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY'

export const GET_POSTS = 'GET_POSTS'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'

export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const GET_COMMENTS_BY_PARENT = 'GET_COMMENTS_BY_PARENT'

export const COMMENT_VOTE = 'COMMENT_VOTE'
export const POST_VOTE = 'POST_VOTE'

export const EDIT_POST = 'EDIT_POST'
export const EDIT_COMMENT = 'EDIT_COMMENT'

export const DELETE_POST = 'DELETE_POST'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const SET_POST = 'SET_POST'
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER'

let rootUrl = `http://localhost:3001`
let header = {
  Authorization:TOKEN,
  'Content-Type': 'application/json'
}

//------------------------------------------------------------------------------

export function fetchAllPosts() {

  return (dispatch) => {
    fetch(`${rootUrl}/posts`,{headers: header})
    .then((response)=>response.json())
    .then((parsedJSON)=>{
      dispatch({type:GET_POSTS,payload:parsedJSON})
    })
  }
}


//------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------

export function fetchPostsByCategory(clickedCategory) {
  return (dispatch) => {
    fetch(`${rootUrl}/${clickedCategory}/posts`,{headers: header})
    .then((response)=>response.json())
    .then((parsedJSON)=>{
      dispatch({type:GET_POSTS,payload:parsedJSON})
    })
  }
}
//------------------------------------------------------------------------------

export function fetchComments(parentId) {
  return(dispatch) => {
    fetch(`${rootUrl}/posts/${parentId}/comments`,{headers: header})
    .then((response)=>response.json())
    .then((parsedJSON)=>{
      dispatch({type:GET_COMMENTS_BY_PARENT,payload:parsedJSON})
    })
  }
}
//------------------------------------------------------------------------------

export function postVote(id,option) {
  return(dispatch) => {
    fetch(`${rootUrl}/posts/${id}`,
      {
        method:'POST',
        headers: header,
        body: JSON.stringify({option:option})
      })
    .then((response)=>response.json())
    .then((parsedJSON)=>{
      dispatch({type:POST_VOTE,payload:parsedJSON})
    })
  }
}
//------------------------------------------------------------------------------

export function commentVote(id,option) {
  return(dispatch) => {
    fetch(`${rootUrl}/comments/${id}`,
      {
        method:'POST',
        headers: header,
        body: JSON.stringify({option:option})
      })
    .then((response)=>response.json())
    .then((parsedJSON)=>{
      dispatch({type:COMMENT_VOTE,payload:parsedJSON})
    })
  }
}
//------------------------------------------------------------------------------

export function addPost(title,category,author,body,commentAmount,postVotes) {
  return (dispatch) => {
    fetch(`${rootUrl}/posts`,
      {
        method: 'POST',
        headers: header,
        body: JSON.stringify(
          {
            id: uuidv1(),
            timestamp: timeStamp(),
            title: title,
            body: body,
            author: author,
            category: category,
          }
        )
      })
    .then((response)=>response.json())
    .then((parsedJSON)=>{
      dispatch({type:ADD_POST,payload:parsedJSON})
    })

  }
}
//------------------------------------------------------------------------------

export function addComment(body,parentId,author) {
  return (dispatch) => {
    fetch(`${rootUrl}/comments`,
      {
        method: 'POST',
        headers: header,
        body: JSON.stringify(
          {
            id: uuidv1(),
            timestamp: timeStamp(),
            body: body,
            author: author,
            parentId: parentId
          }
        )
      })
    .then((response)=>response.json())
    .then((parsedJSON)=>{
      dispatch({type:ADD_COMMENT,payload:parsedJSON})
    })

  }
}

//------------------------------------------------------------------------------

export function deletePost(post) {
  return (dispatch) => {
    fetch(`${rootUrl}/posts/${post.id}`,
      {
        method: 'DELETE',
        headers: header
      }
    )
    .then((response)=>response.json())
    .then((parsedJSON)=>{
      dispatch({type:DELETE_POST,payload:parsedJSON})
    })
  }
}

export function deleteComment(comment) {
  return (dispatch) => {

    fetch(`${rootUrl}/comments/${comment.id}`,
      {
        method:'DELETE',
        headers: header
      }
    )
    .then((response)=>response.json())
    .then((parsedJSON)=>{
      dispatch({type:DELETE_COMMENT,payload:parsedJSON})
    })
  }
}

//------------------------------------------------------------------------------

export function editPost(post) {
  return (dispatch) => {
    fetch(`${rootUrl}/posts/${post.id}`,
      {
        method:'PUT',
        headers: header,
        body: JSON.stringify(
          {
            title:post.title,
            body:post.body
          }
        )
      }
    )
    .then((response)=>response.json())
    .then((parsedJSON)=>{
      dispatch({type:EDIT_POST,payload:parsedJSON})
    })
  }
}

export function editComment(comment) {
  return (dispatch) => {
    fetch(`${rootUrl}/comments/${comment.id}`,
      {
        method:'PUT',
        headers: header,
        body: JSON.stringify(
          {
            timeStamp:timeStamp(),
            body:comment.body
          }
        )
      }
    )
    .then((response)=>response.json())
    .then((parsedJSON)=>{
      dispatch({type:EDIT_COMMENT,payload:parsedJSON})
    })

  }
}
//------------------------------------------------------------------------------

export function setPost(post) {
  return {
    type: SET_POST,
    post
  }
}
