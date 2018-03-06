import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card'
import {connect} from 'react-redux'
import AddCommentView from './AddCommentView'
import TextField from 'material-ui/TextField';
import CommentView from './CommentView'
import {fetchComments,commentVote,postVote,editPost,setPost} from '../actions'
import Divider from 'material-ui/Divider';
import {Link} from 'react-router-dom'

class PostDetailView extends Component {

  styles={
    fontSize:'18px',
    cursor:'pointer',
    editPostBox: {
      width:'50%'
    }
  }

  toggleEditPost(currentPost) {
    currentPost.editMode=!currentPost.editMode
    this.forceUpdate()
  }

  updateTitle(event,currentPost) {
    event.persist()
    currentPost.title=event.target.value
  }
  updateBody(event,currentPost) {
    event.persist()
    currentPost.body=event.target.value
  }
  submitPost=(post)=>{
    this.props.editPost('token',post.id,post)
  }

  render() {
    const {postVote,currentPost,fetchComments} = this.props
    const returnRoute = `/category/${currentPost.category}`
    return (
      <div>
        {currentPost.editMode ? (
          <Card onExpandChange={()=>{fetchComments('token',currentPost.id)}}>
            <CardHeader>
              <div>
                <span>Title: </span>
                <TextField
                  onChange={(event)=>this.updateTitle(event,currentPost)}
                  id="title"
                  style={this.styles.editPostBox}
                  defaultValue={currentPost.title}
                  >
                </TextField>
              </div>

              <div>
                <span>Body: </span>
                <TextField
                  onChange={(event)=>this.updateBody(event,currentPost)}
                  id="body"
                  style={this.styles.editPostBox}
                  defaultValue={currentPost.body}
                  >
                </TextField>
              </div>

              <i
                style={this.styles}
                className="material-icons"
                onClick={()=>{
                  this.submitPost(currentPost)
                  this.toggleEditPost(currentPost)
                }}>
                add_circle
              </i>
            </CardHeader>
          </Card>
        ):(
          <Card onExpandChange={()=>{fetchComments('token',currentPost.id)}}>
          <CardHeader
            title={currentPost.title}
            subtitle={currentPost.author+" - "+currentPost.body}
            actAsExpander={true}
            showExpandableButton={true}
          >

          </CardHeader>


          <CardText>
            <span>
              <span style={this.styles}>{currentPost.voteScore} </span>
              <i onClick={()=>{postVote('token',currentPost.id,'upVote')}} style={this.styles} className="material-icons">thumb_up</i>
              <i onClick={()=>{postVote('token',currentPost.id,'downVote')}} style={this.styles} className="material-icons">thumb_down</i>
              <i onClick={()=>{this.toggleEditPost(currentPost)}} style={this.styles} className="material-icons">edit</i>
              <Link to={returnRoute}>
                <i style={this.styles} className="material-icons">keyboard_backspace</i>
              </Link>
            </span>
          </CardText>

          <Divider/>

          <CommentView expandable={true}/>
          <AddCommentView postId={currentPost.id} expandable={true}/>

          </Card>
        )}

      </div>
    )
  }
}

function mapStateToProps(initialState) {
  return {
    currentPost: initialState.currentPost,
    currentCategory: initialState.currentCategory,
    posts: initialState.posts,
    comments: initialState.comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComments: (token,parentId) => dispatch(fetchComments(token,parentId)),
    commentVote: (token,id,option) => dispatch(commentVote(token,id,option)),
    postVote: (token,id,option) => dispatch(postVote(token,id,option)),
    editPost: (post) => dispatch(editPost(post)),
    setPost: (post) => dispatch(setPost(post))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostDetailView);
