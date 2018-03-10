import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card'
import {connect} from 'react-redux'
import AddCommentView from './AddCommentView'
import TextField from 'material-ui/TextField';
import CommentView from './CommentView'
import {postVote,editPost,setPost,getSpecificPost,fetchAllPosts} from '../actions'
import {fetchComments,setCurrentCategory} from '../actions'
import Divider from 'material-ui/Divider';
import {Link} from 'react-router-dom'
import '../styles/index.css'

class PostDetailView extends Component {

  componentDidMount(){
    this.props.fetchAllPosts()
    this.props.getSpecificPost(localStorage.currentPostId)
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
    this.props.editPost(post)
  }

  render() {
    const {postVote,currentPost,fetchComments,currentCategory,posts} = this.props
    const returnRoute = `/category/${currentCategory}`

    return (
      <div>

        {posts.filter((thisPost)=>thisPost.id===currentPost.id).map((post)=>(

          currentPost.editMode ? (

            <Card
              key={post.id}
              onExpandChange={()=>{
                fetchComments(currentPost.id)

              }}>

              <CardHeader>
                <div>
                  <span>Title: </span>
                  <TextField
                    onChange={(event)=>this.updateTitle(event,currentPost)}
                    id="title"
                    className="editPostBox"
                    defaultValue={currentPost.title}
                    >
                  </TextField>
                </div>

                <div>
                  <span>Body: </span>
                  <TextField
                    onChange={(event)=>this.updateBody(event,currentPost)}
                    id="body"
                    className="editPostBox"
                    defaultValue={currentPost.body}
                    >
                  </TextField>
                </div>

                <i
                  className="material-icons addCommentFont"
                  onClick={()=>{
                    this.submitPost(currentPost)
                    this.toggleEditPost(currentPost)
                  }}>
                  add_circle
                </i>
              </CardHeader>
            </Card>
          ):(
            <Card
              key={post.id}
              onExpandChange={()=>{
                fetchComments(currentPost.id)
              }}>

            <CardHeader
              title={currentPost.title}
              subtitle={currentPost.author+" - "+currentPost.body}
              actAsExpander={true}
              showExpandableButton={true}
            >

            </CardHeader>


            <CardText>
              <span>
                <span className="addCommentFont">{post.voteScore} </span>
                <i onClick={()=>{postVote(post.id,'upVote')}} className="material-icons addCommentFont">thumb_up</i>
                <i onClick={()=>{postVote(post.id,'downVote')}} className="material-icons addCommentFont">thumb_down</i>
                <i onClick={()=>{this.toggleEditPost(currentPost)}} className="material-icons addCommentFont">edit</i>
                <span className="addCommentFont">(<i className="material-icons smallerFont">comment</i> {post.commentCount})</span>
                <Link onMouseOver={()=>{
                    this.props.setCurrentCategory(currentPost.category)
                  }} to={returnRoute}>
                  <i className="material-icons addCommentFont">keyboard_backspace</i>
                </Link>
              </span>
            </CardText>

            <Divider/>

            <CommentView expandable={true}/>
            <AddCommentView postId={currentPost.id} expandable={true}/>

            </Card>
          )
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
    fetchComments: (parentId) => dispatch(fetchComments(parentId)),
    fetchAllPosts: ()=>dispatch(fetchAllPosts()),
    postVote: (id,option) => dispatch(postVote(id,option)),
    editPost: (post) => dispatch(editPost(post)),
    setPost: (post) => dispatch(setPost(post)),
    setCurrentCategory: (category) => dispatch(setCurrentCategory(category)),
    getSpecificPost: (post) => dispatch(getSpecificPost(post))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostDetailView);
