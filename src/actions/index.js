/**An action will RETURN the things specified in the function arguments. It
is then passed off to the reducer to be changed. */
import categoryAPI from '../api-server/categories'
import postsAPI from '../api-server/posts'
import commentsAPI from '../api-server/comments'
const uuidv1 = require('uuid/v1')
const timeStamp = require('time-stamp')

//------------------------------------------------------------------------------
export function fetchCategories() {
  return (dispatch) => {
    categoryAPI.getAll().then((catArray)=>{
      dispatch({type:'GET_CATEGORIES',payload:catArray})
    })
  }
}

//------------------------------------------------------------------------------

export function fetchPostsByCategory(clickedCategory) {
  return (dispatch) => {
    postsAPI.getByCategory('token',clickedCategory).then((postsArray)=>{
      dispatch({type:'GET_POSTS',payload:postsArray})
    })
  }
}
//------------------------------------------------------------------------------

export function addPost(title,author,body,category,commentAmount,postVotes) {
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
  postsAPI.add('token',post).then((postObj)=>{
    console.log(postObj)
  })
}
//------------------------------------------------------------------------------

export function fetchComments(token,parentId) {
  return(dispatch) => {
    commentsAPI.getByParent(token,parentId).then((comments)=>{
      dispatch({type:'GET_COMMENTS_BY_PARENT',payload:comments})
    })
  }
}

//------------------------------------------------------------------------------
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_POSTS = 'GET_POSTS'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const ADD_POST = 'ADD_POST'
export const GET_COMMENTS_BY_PARENT = 'GET_COMMENTS_BY_PARENT'
