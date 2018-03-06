import React, { Component } from 'react';
import {CardText} from 'material-ui/Card'
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField';
import {commentVote,deleteComment,editComment} from '../actions'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

class PostDetailView extends Component {

  state = {
    editCommentBoxOpen: false
  }

  styles={
    fontSize:'18px',
    cursor:'pointer'
  }

  toggleEditComment = (token,id,comment) => {
    this.setState({editCommentBoxOpen: !this.state.editCommentBoxOpen})
    if(this.state.editCommentBoxOpen) {
      return (
        <ToolbarGroup firstChild={true}>
          <TextField hintText="Test"></TextField>
        </ToolbarGroup>
      )
    } else return (
      <ToolbarGroup firstChild={true}>
        {comment.body}
      </ToolbarGroup>
    )
  }

  render() {
    const {comments,commentVote,deleteComment} = this.props
    return (
      <div>
        {comments.map((comment)=>(
          <CardText key={comment.id}>
            <Toolbar>

              {()=>this.toggleEditComment('token','',comment)}

              <ToolbarGroup>
                <i onClick={()=>{commentVote('token',comment.id,'upVote')}} style={this.styles} className="material-icons">thumb_up</i>
                <i onClick={()=>{commentVote('token',comment.id,'downVote')}} style={this.styles} className="material-icons">thumb_down</i>
                <i onClick={()=>{this.toggleEditComment('token',comment.id,comment)}} style={this.styles} className="material-icons">edit</i>
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
