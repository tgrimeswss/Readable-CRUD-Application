import React, { Component } from 'react';
import {CardText} from 'material-ui/Card'
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField';
import {commentVote,deleteComment,editComment} from '../actions'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import '../styles/index.css'

class PostDetailView extends Component {

  updateEdit=(event,comment)=>{
    event.persist()
    comment.body = event.target.value
  }

  toggleEditComment = (comment) => {
    comment.editMode=!comment.editMode
    this.forceUpdate()
  }

  submitComment = (comment) => {
    this.props.editComment(comment)
  }

  render() {
    const {comments,commentVote,deleteComment} = this.props
    return (
      <div>
        {comments.map((comment)=>(
          <CardText key={comment.id}>
            <Toolbar>
              <ToolbarGroup firstChild={true}>
                {comment.editMode ? (
                  <div>
                    <TextField
                      onChange={(event)=>{
                        this.updateEdit(event,comment)
                      }}
                      className="commentBox"
                      id={comment.body}
                      defaultValue={comment.body}
                      >
                    </TextField>
                    <i
                      onClick={()=>{
                        this.submitComment(comment)
                        this.toggleEditComment(comment)
                      }}
                      className="material-icons addCommentFont"
                      >
                      add_circle
                    </i>
                  </div>
                ):(
                  <div className="commentText">{comment.author} - {comment.body}</div>
                )}
              </ToolbarGroup>

              <ToolbarGroup>
                <i onClick={()=>{commentVote(comment.id,'upVote')}} className="addCommentFont material-icons">thumb_up</i>
                <i onClick={()=>{commentVote(comment.id,'downVote')}} className="addCommentFont material-icons">thumb_down</i>
                <i onClick={()=>{this.toggleEditComment(comment)}} className="addCommentFont material-icons">edit</i>
                <i onClick={()=>{deleteComment(comment)}} className="addCommentFont material-icons">delete</i>
                <span>{comment.voteScore}</span>
              </ToolbarGroup>
            </Toolbar>
          </CardText>
        ))}
      </div>
    )


  }
}

function mapStateToProps(initialState) {
  return {
    currentCategory: initialState.categoryReducer.currentCategory,
    posts: initialState.postReducer.posts,
    comments: initialState.commentReducer.comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    commentVote: (id,option) => dispatch(commentVote(id,option)),
    deleteComment: (comment) => dispatch(deleteComment(comment)),
    editComment: (comment) => dispatch(editComment(comment))
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (PostDetailView);
