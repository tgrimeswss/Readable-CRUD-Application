import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addPost,setCurrentCategory} from '../actions'
import {Link} from 'react-router-dom'
import TextField from 'material-ui/TextField';

class AddPost extends Component {

  state={
    postCategory:this.props.currentCategory,
    postAuthor: '',
    postTitle: '',
    postBody: '',
    open: true
  }

  styles={
    author: {},
    title: {},
    body: {
      multiLine: 'true'
    },
    submit: {
      cursor:'pointer'
    }
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
    const returnRoute = `/category/${currentCategory}`
    return (
      <div>
          <TextField
            onChange={(event)=>{this.updateCategory(event)}}
            style={this.styles.body}
            defaultValue={this.props.currentPost.category}
            id="category"/>
        <br/>

          <TextField
            onChange={(event)=>{this.updateAuthor(event)}}
            style={this.styles.body}
            hintText="Author name"
            id="name"/>
        <br/>

          <TextField
            onChange={(event)=>{this.updateTitle(event)}}
            style={this.styles}
            hintText="Post title"
            id="title"/>
        <br/>

          <TextField
            onChange={(event)=>{this.updateBody(event)}}
            style={this.styles}
            hintText="Post body"
            id="body"/>
        <br/>

        <Link to={returnRoute}>
          <i
            style={this.styles.submit}
            onClick={()=>addPost(postTitle,postCategory,postAuthor,postBody,currentCategory)}
            className="material-icons">add_circle_outline
          </i>
        </Link>

      </div>
    )

  }
}

function mapStateToProps(initialState) {
  return {
    currentCategory: initialState.currentCategory,
    currentPost: initialState.currentPost
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (postTitle,postCategory,postAuthor,postBody,value) => dispatch(addPost(postTitle,postCategory,postAuthor,postBody,value)),
    setCurrentCategory: (category) => dispatch(setCurrentCategory(category))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddPost);
