import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {addComment} from '../actions'
import {connect} from 'react-redux'
import '../styles/index.css'

class AddCommentView extends Component {

  state = {
    commentBody: ''
  }

  updateComment=(event)=>{
    this.setState({commentBody:event.target.value})
  }


  render() {
    let {commentBody} = this.state
    let {postId,addComment} = this.props
    return (
      <div>
        <span>
          Add Comment: <span>  </span>
          <TextField
            onChange={(event)=>{this.updateComment(event)}}
            id="comment"
            hintText="Add your comment here">
          </TextField>
        <i
          onClick={()=>{
            addComment(commentBody,postId,'Someone')
          }}
          className="material-icons addCommentFont">
            add_circle_outline
        </i>
        </span>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (body,parentId,author) => dispatch(addComment(body,parentId,author))
  }
}

export default connect(null,mapDispatchToProps)(AddCommentView);
