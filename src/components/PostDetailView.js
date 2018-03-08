import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card'
import {connect} from 'react-redux'
import AddCommentView from './AddCommentView'
import CommentView from './CommentView'
import {editPost,setPost,deletePost,postVote,fetchAllPosts} from '../actions'
import Divider from 'material-ui/Divider';
import {Link} from 'react-router-dom'

class PostDetailView extends Component {

  styles={
    fontSize:'18px',
    cursor:'pointer'
  }

  componentDidMount(){
    let {setPost,fetchAllPosts} = this.props
    setPost(this.props.post)
    fetchAllPosts()
  }

  render() {
    const {post,deletePost,setPost,currentPost,postVote} = this.props
    const routeToPost = `/category/${currentPost.category}/${currentPost.id}`

    return (

      <div>
        <Card>
          <Link
            onMouseOver={()=>{
              setPost(post)
            }}
            to={routeToPost}
            >
          <CardHeader title={post.title} subtitle={post.author+" - "+post.body}></CardHeader>
          </Link>

          <CardText>
            <span>
              <span style={this.styles}>{post.voteScore} </span>
                <i onClick={()=>{postVote(currentPost.id,'upVote')}} style={this.styles} className="material-icons">thumb_up</i>
                <i onClick={()=>{postVote(currentPost.id,'downVote')}} style={this.styles} className="material-icons">thumb_down</i>
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
    fetchAllPosts: () => dispatch(fetchAllPosts()),
    editPost: (post) => dispatch(editPost(post)),
    setPost: (post) => dispatch(setPost(post)),
    deletePost: (post) => dispatch(deletePost(post)),
    postVote: (id,option) => dispatch(postVote(id,option))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostDetailView);
