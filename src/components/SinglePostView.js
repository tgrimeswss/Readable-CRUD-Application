import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card'
import {connect} from 'react-redux'
import AddCommentView from './AddCommentView'
import TextField from 'material-ui/TextField';
import CommentView from './CommentView'
import {fetchComments,postVote,editPost,setPost,setCurrentCategory} from '../actions'
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

  componentDidUpdate(){
    this.props.setPost(this.props.currentPost)
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

            <Card key={post.id} onExpandChange={()=>{fetchComments(currentPost.id)}}>
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
            <Card key={post.id} onExpandChange={()=>{fetchComments(currentPost.id)}}>
            <CardHeader
              title={currentPost.title}
              subtitle={currentPost.author+" - "+currentPost.body}
              actAsExpander={true}
              showExpandableButton={true}
            >

            </CardHeader>


            <CardText>
              <span>
                <span style={this.styles}>{post.voteScore} </span>
                <i onClick={()=>{postVote(post.id,'upVote')}} style={this.styles} className="material-icons">thumb_up</i>
                <i onClick={()=>{postVote(post.id,'downVote')}} style={this.styles} className="material-icons">thumb_down</i>
                <i onClick={()=>{this.toggleEditPost(currentPost)}} style={this.styles} className="material-icons">edit</i>
                <Link onMouseOver={()=>{
                    this.props.setCurrentCategory(currentPost.category)
                  }} to={returnRoute}>
                  <i style={this.styles} className="material-icons">keyboard_backspace</i>
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
  return {
    currentPost: initialState.currentPost,
    currentCategory: initialState.currentCategory,
    posts: initialState.posts,
    comments: initialState.comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComments: (parentId) => dispatch(fetchComments(parentId)),
    postVote: (id,option) => dispatch(postVote(id,option)),
    editPost: (post) => dispatch(editPost(post)),
    setPost: (post) => dispatch(setPost(post)),
    setCurrentCategory: (category) => dispatch(setCurrentCategory(category))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostDetailView);
