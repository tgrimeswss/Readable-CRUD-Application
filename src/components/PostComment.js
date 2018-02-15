import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux'
import {addPost,deletePost,addComment,deleteComment} from '../actions'

class PostComment extends Component {

  state={
    value:''
  }

  changeValue = (event) => {
    let thisValue = event.target.value
    this.setState((state)=>{
      return {value:thisValue}
    })
  }

  render() {
    let {value} = this.state
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <TextField onChange={this.changeValue} hintText="Post your comment below"/>
            <i onClick={()=>{addComment(value)}} className="material-icons">add</i>
          </div>
        </MuiThemeProvider>
      </div>
    );

  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    posts: state.posts,
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data)),
    deletePost: (data) => dispatch(deletePost(data)),
    addComment: (data) => dispatch(addComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostComment);
