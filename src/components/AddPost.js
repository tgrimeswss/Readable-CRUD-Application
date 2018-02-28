import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addPost} from '../actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import postsAPI from '../api-server/posts'
import {Link} from 'react-router-dom'
import Dialog from 'material-ui/Dialog';

class AddPost extends Component {

  state={
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

  updateAuthor=(event)=>{
    this.setState({postAuthor:event.target.value})
  }

  updateBody=(event)=>{
    this.setState({postBody:event.target.value})
  }

  componentDidMount(){
    postsAPI.getAll().then((postsArray)=>{
      console.log(postsArray)
    })
  }

  render() {
    const {postAuthor,postTitle,postBody} = this.state
    const {value} = this.props

    if(value!=="") {
      return (
        <div>
          <MuiThemeProvider>
            <TextField
              onChange={(event)=>{this.updateAuthor(event)}}
              style={this.styles.body}
              hintText="Author name"
              id="name"/>
          </MuiThemeProvider>
          <br/>

          <MuiThemeProvider>
            <TextField
              onChange={(event)=>{this.updateTitle(event)}}
              style={this.styles}
              hintText="Post title"
              id="title"/>
          </MuiThemeProvider>
          <br/>

          <MuiThemeProvider>
            <TextField
              onChange={(event)=>{this.updateBody(event)}}
              style={this.styles}
              hintText="Post body"
              id="body"/>
          </MuiThemeProvider>
          <br/>

          <i
            style={this.styles.submit}
            onClick={()=>addPost(postTitle,postAuthor,postBody,value)}
            className="material-icons">add_circle_outline
          </i>

        </div>
      )
    } else return (
      <div>
        <MuiThemeProvider>
          <Dialog
            title="Dialog With Actions"
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
          Select a category from the menu
          </Dialog>
      </MuiThemeProvider>
      </div>
    )

  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data))
  }
}

export default connect(mapDispatchToProps)(AddPost);
