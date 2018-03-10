import {
  GET_COMMENTS_BY_PARENT,
  COMMENT_VOTE,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT
} from './actionTypes'

import keys from '../keys'
const uuidv1 = require('uuid/v1')
const timeStamp = require('time-stamp')
let TOKEN = keys.TOKEN

let rootUrl = `http://localhost:3001`
let header = {
  Authorization:TOKEN,
  'Content-Type': 'application/json'
}

export function fetchComments(parentId) {
  return(dispatch) => {
    fetch(`${rootUrl}/posts/${parentId}/comments`,{headers: header})
    .then((response)=>response.json())
    .then((parsedJSON)=>{
      dispatch({type:GET_COMMENTS_BY_PARENT,payload:parsedJSON})
    })
  }
}

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
