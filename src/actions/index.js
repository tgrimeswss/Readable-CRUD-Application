/**An action will RETURN the things specified in the function arguments. It
is then passed off to the reducer to be changed. */
import categoryAPI from '../api-server/categories'
import postsAPI from '../api-server/posts'
import commentsAPI from '../api-server/comments'
const uuidv1 = require('uuid/v1')
const timeStamp = require('time-stamp')

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

//------------------------------------------------------------------------------

export function fetchAllPosts() {
  return (dispatch) => {
    postsAPI.getAll().then((postsArray)=>{
      dispatch({type:GET_POSTS,payload:postsArray})
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
    categoryAPI.getAll().then((catArray)=>{
      dispatch({type:GET_CATEGORIES,payload:catArray})
    })
  }
}

//------------------------------------------------------------------------------

export function fetchPostsByCategory(clickedCategory) {
  return (dispatch) => {
    postsAPI.getByCategory('token',clickedCategory).then((postsArray)=>{
      dispatch({type:GET_POSTS,payload:postsArray})
    })
  }
}
//------------------------------------------------------------------------------

export function fetchComments(token,parentId) {
  return(dispatch) => {
    commentsAPI.getByParent(token,parentId).then((comments)=>{
      dispatch({type:GET_COMMENTS_BY_PARENT,payload:comments})
    })
  }
}
//------------------------------------------------------------------------------

export function postVote(token,id,option) {
  return(dispatch) => {
    postsAPI.vote(token,id,option).then((newPost)=>{
      dispatch({type:POST_VOTE,payload:newPost})
    })
  }
}
//------------------------------------------------------------------------------

export function commentVote(token,id,option) {
  return(dispatch) => {
      commentsAPI.vote(token,id,option).then((newComment)=>{
        dispatch({type:COMMENT_VOTE,payload:newComment})
      })
  }
}
//------------------------------------------------------------------------------

export function addPost(title,category,author,body,commentAmount,postVotes) {
  let post = {
    id: uuidv1(),
    title: title,
    author: author,
    body: body,
    category: category,
    timestamp: timeStamp(),
    commentAmount: commentAmount,
    postVotes: postVotes
  }
  return (dispatch) => {
    postsAPI.add('token',post).then((newPost)=>{
      dispatch({type:ADD_POST,payload:newPost})
    })
  }
}
//------------------------------------------------------------------------------

export function addComment(body,parentId,author) {
  let comment = {
    author: author,
    id: uuidv1(),
    parentId: parentId,
    timestamp: timeStamp(),
    body: body
  }
  return (dispatch) => {
    commentsAPI.add('token',comment).then((newComment)=>{
      dispatch({type:ADD_COMMENT,payload:newComment})
    })
  }
}

//------------------------------------------------------------------------------

export function deletePost(post) {
  return (dispatch) => {
    postsAPI.disable('token',post.id).then((deletedPost)=>{
      dispatch({type:DELETE_POST,payload:deletedPost})
    })
  }
}

export function deleteComment(comment) {
  return (dispatch) => {
    commentsAPI.disable('token',comment.id).then((deletedComment)=>{
      dispatch({type:DELETE_COMMENT,payload:deletedComment})
    })
  }
}

//------------------------------------------------------------------------------

export function editPost(post) {
  return (dispatch) => {

  }
}

export function editComment(token,id,comment) {
  return (dispatch) => {
    commentsAPI.edit(token,id,comment).then((newComment)=>{
      dispatch({type:EDIT_COMMENT,payload:newComment})
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
