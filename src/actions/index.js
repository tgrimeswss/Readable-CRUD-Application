export function addPost ({post}) {
  return {
    type: ADD_POST,
    post
  }
}

export function deletePost ({post}) {
  return {
    type: DELETE_POST,
    post
  }
}

export function addComment ({comment}) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function deleteComment ({comment}) {
  return {
    type: DELETE_COMMENT,
    comment
  }
}

export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
