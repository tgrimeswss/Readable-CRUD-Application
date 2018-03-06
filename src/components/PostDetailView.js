import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card'
import {connect} from 'react-redux'
import AddCommentView from './AddCommentView'
import CommentView from './CommentView'
import {fetchComments,commentVote,postVote,editPost,setPost,deletePost} from '../actions'
import Divider from 'material-ui/Divider';
import {Link} from 'react-router-dom'

class PostDetailView extends Component {

  styles={
    fontSize:'18px',
    cursor:'pointer'
  }

  componentDidMount(){
    let {setPost} = this.props
    setPost(this.props.post)
  }

  render() {
    const {post,setPost,currentPost,deletePost} = this.props
    const routeToPost = `${currentPost.category}/${currentPost.id}`

    return (

      <div>
        <Card onExpandChange={()=>{setPost(post)}}>
          <Link to={routeToPost}>
          <CardHeader title={post.title} subtitle={post.author+" - "+post.body}></CardHeader>
          </Link>

          <CardText>
            <span>
              <span style={this.styles}>{post.voteScore} </span>
              <i onClick={()=>{postVote('token',post.id,'upVote')}} style={this.styles} className="material-icons">thumb_up</i>
              <i onClick={()=>{postVote('token',post.id,'downVote')}} style={this.styles} className="material-icons">thumb_down</i>
              <i onClick={()=>{deletePost(post)}} style={this.styles} className="material-icons">delete</i>
            </span>
          </CardText>

          <Divider/>

          <CommentView expandable={true} post={post}/>

          <AddCommentView postId={post.id} expandable={true}/>

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
    editPost: (post) => dispatch(editPost(post)),
    setPost: (post) => dispatch(setPost(post)),
    deletePost: (post) => dispatch(deletePost(post))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostDetailView);
