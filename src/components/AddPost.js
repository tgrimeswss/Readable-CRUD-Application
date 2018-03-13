import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addPost,setCurrentCategory} from '../actions'
import {Link} from 'react-router-dom'
import TextField from 'material-ui/TextField';
import '../styles/index.css'
import RaisedButton from 'material-ui/RaisedButton';

class AddPost extends Component {

  state={
    postCategory:this.props.currentCategory,
    postAuthor: '',
    postTitle: '',
    postBody: '',
    open: true
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  updateTitle=(event)=>{
    this.setState({postTitle:event.target.value})
  }

  updateCategory=(event)=>{
    this.setState({postCategory:event.target.value})
  }

  updateAuthor=(event)=>{
    this.setState({postAuthor:event.target.value})
  }

  updateBody=(event)=>{
    this.setState({postBody:event.target.value})
  }

  render() {
    const {postAuthor,postTitle,postBody,postCategory} = this.state
    const {addPost,currentCategory} = this.props
    return (
      <div>
          <TextField
            onChange={(event)=>{this.updateCategory(event)}}
            className="addCommentFont"
            hintText="Type a category"
            id="category"/>
        <br/>

          <TextField
            onChange={(event)=>{this.updateAuthor(event)}}
            className="addCommentFont"
            hintText="Author name"
            id="name"/>
        <br/>

          <TextField
            onChange={(event)=>{this.updateTitle(event)}}
            className="addCommentFont"
            hintText="Post title"
            id="title"/>
        <br/>

          <TextField
            onChange={(event)=>{this.updateBody(event)}}
            className="addCommentFont"
            hintText="Post body"
            id="body"/>
        <br/>

        <Link to="/">
          <RaisedButton
            label="Add Post"
            primary={true} 
            onClick={()=>addPost(postTitle,postCategory,postAuthor,postBody,currentCategory)}
            className="material-icons addCommentFont"
            >

          </RaisedButton>
        </Link>

      </div>
    )

  }
}

function mapStateToProps(initialState) {
  return {
    currentCategory: initialState.categoryReducer.currentCategory,
    currentPost: initialState.postReducer.currentPost
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (postTitle,postCategory,postAuthor,postBody,value) => dispatch(addPost(postTitle,postCategory,postAuthor,postBody,value)),
    setCurrentCategory: (category) => dispatch(setCurrentCategory(category))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddPost);
