import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card'
import {connect} from 'react-redux'
import AddCommentView from './AddCommentView'
import CommentView from './CommentView'
import {fetchComments,commentVote,postVote,deletePost,editPost,setPost} from '../actions'
import Divider from 'material-ui/Divider';

class PostDetailView extends Component {

  styles={
    fontSize:'18px',
    cursor:'pointer'
  }

  render() {
    const {postVote,deletePost,currentPost,fetchComments} = this.props

    return (
      <div>
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
            <i onClick={()=>{editPost(currentPost)}} style={this.styles} className="material-icons">edit</i>
            <i onClick={()=>{deletePost(currentPost)}} className="material-icons" style={this.styles}>delete</i>
          </span>
        </CardText>

        <Divider/>

        <CommentView expandable={true}/>
        <AddCommentView postId={currentPost.id} expandable={true}/>

        </Card>
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
    deletePost: (post) => dispatch(deletePost(post)),
    editPost: (post) => dispatch(editPost(post)),
    setPost: (post) => dispatch(setPost(post))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostDetailView);
