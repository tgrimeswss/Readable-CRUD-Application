import React, { Component } from 'react';
import {CardText} from 'material-ui/Card'
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField';
import {commentVote,deleteComment,editComment} from '../actions'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

class PostDetailView extends Component {

  styles={
    fontSize:'18px',
    cursor:'pointer',
    commentBox: {
      backgroundColor:'white',
      border:'solid black 1px'
    },
    commentText: {
      paddingLeft: '10px'
    }
  }

  updateEdit=(event,comment)=>{
    event.persist()
    comment.body = event.target.value
  }

  toggleEditComment = (comment) => {
    comment.editMode=!comment.editMode
    this.forceUpdate()
  }

  submitComment = (comment) => {
    this.props.editComment('token',comment.id,comment)
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
                      style={this.styles.commentBox}
                      id={comment.body}
                      defaultValue={comment.body}
                      >
                    </TextField>
                    <i
                      style={this.styles}
                      onClick={()=>{
                        this.submitComment(comment)
                        this.toggleEditComment(comment)
                      }}
                      className="material-icons"
                      >
                      add_circle
                    </i>
                  </div>
                ):(
                  <div style={this.styles.commentText}>{comment.author} - {comment.body}</div>
                )}
              </ToolbarGroup>

              <ToolbarGroup>
                <i onClick={()=>{commentVote('token',comment.id,'upVote')}} style={this.styles} className="material-icons">thumb_up</i>
                <i onClick={()=>{commentVote('token',comment.id,'downVote')}} style={this.styles} className="material-icons">thumb_down</i>
                <i onClick={()=>{this.toggleEditComment(comment)}} style={this.styles} className="material-icons">edit</i>
                <i onClick={()=>{deleteComment(comment)}} className="material-icons" style={this.styles}>delete</i>
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
    currentCategory: initialState.currentCategory,
    posts: initialState.posts,
    comments: initialState.comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    commentVote: (token,id,option) => dispatch(commentVote(token,id,option)),
    deleteComment: (comment) => dispatch(deleteComment(comment)),
    editComment: (token,id,comment) => dispatch(editComment(token,id,comment))
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (PostDetailView);
