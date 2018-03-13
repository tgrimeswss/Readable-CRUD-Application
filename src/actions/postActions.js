import {
  GET_POSTS,
  GET_SPECIFIC_POSTS,
  ADD_POST,
  POST_VOTE,
  DELETE_POST,
  EDIT_POST,
  SET_POST,
  GET_POST
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

export function fetchAllPosts() {

  return (dispatch) => {
    fetch(`${rootUrl}/posts`,{headers: header})
    .then((response)=>response.json())
    .then((parsedJSON)=>{
      dispatch({type:GET_POSTS,payload:parsedJSON})
    })
  }
}

export function fetchPostsByCategory(clickedCategory) {
  return (dispatch) => {
    fetch(`${rootUrl}/${clickedCategory}/posts`,{headers: header})
    .then((response)=>response.json())
    .then((parsedJSON)=>{
      dispatch({type:GET_POSTS,payload:parsedJSON})
    })
  }
}


export function getSpecificPost(id) {
  return (dispatch) => {
    fetch(`${rootUrl}/posts/${id}`,{headers: header})
    .then((response)=>response.json())
    .then((parsedJSON)=>{
      dispatch({type:GET_SPECIFIC_POSTS,payload:parsedJSON})
    })
  }
}

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

export function setPost(post) {
  return {
    type: SET_POST,
    post
  }
}

export function getPost(id) {
  return (dispatch) => {
    fetch(`${rootUrl}/posts/${id}`,
      {
        method: 'GET',
        headers: header
      }
    )
    .then((response)=>response.json())
    .then((parsedJSON)=>{
      dispatch({type:GET_POST,payload:parsedJSON})
    })
  }
}
