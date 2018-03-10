import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card'
import {connect} from 'react-redux'
import AddCommentView from './AddCommentView'
import CommentView from './CommentView'
import {editPost,setPost,deletePost,postVote,fetchAllPosts,setCurrentCategory} from '../actions'
import Divider from 'material-ui/Divider';
import {Link} from 'react-router-dom'
import '../styles/index.css'

class PostDetailView extends Component {

  componentDidMount(){
    let {fetchAllPosts,setCurrentCategory} = this.props
    fetchAllPosts()
    setCurrentCategory(localStorage.currentCategory)
  }

  componentWillUpdate(nextProps){
    localStorage.setItem('currentPostId',nextProps.currentPost.id)
  }

  render() {
    const {deletePost,currentPost,postVote,setPost,posts,currentCategory} = this.props

    return (

      <div>
        {posts.filter((post)=>post.category===currentCategory).map((post)=>(


        <Card key={post.id} onClick={()=>this.props.setPost(post)} onMouseOver={()=>setPost(post)}>
          <Link to={"/category/"+currentPost.category+"/"+localStorage.currentPostId}>
            <CardHeader title={post.title} subtitle={post.author+" - "+post.body}></CardHeader>
          </Link>

          <CardText>
            <span>
              <span className="addCommentFont">{post.voteScore} </span>
              <i onClick={()=>{postVote(post.id,'upVote')}} className="material-icons addCommentFont">thumb_up</i>
              <i onClick={()=>{postVote(post.id,'downVote')}} className="material-icons addCommentFont">thumb_down</i>
              <i onClick={()=>{deletePost(post)}} className="material-icons addCommentFont">delete</i>
              <span className="addCommentFont">(<i className="material-icons smallerFont">comment</i> {post.commentCount})</span>
            </span>
          </CardText>
          <Divider/>

          <CommentView expandable={true} post={post}/>

          <AddCommentView postId={post.id} expandable={true}/>

        </Card>
        ))}

      </div>

    )
  }
}

function mapStateToProps(initialState) {
  let postReducer = initialState.postReducer
  return {
    currentPost: postReducer.currentPost,
    currentCategory: initialState.categoryReducer.currentCategory,
    posts: postReducer.posts,
    comments: initialState.commentReducer.comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllPosts: () => dispatch(fetchAllPosts()),
    editPost: (post) => dispatch(editPost(post)),
    setPost: (post) => dispatch(setPost(post)),
    deletePost: (post) => dispatch(deletePost(post)),
    postVote: (id,option) => dispatch(postVote(id,option)),
    setCurrentCategory: (category) => dispatch(setCurrentCategory(category))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostDetailView);
