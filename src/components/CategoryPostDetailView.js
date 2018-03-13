import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card'
import {connect} from 'react-redux'
import AddCommentView from './AddCommentView'
import CommentView from './CommentView'
import ErrorView from './ErrorView'
import {setPost,deletePost,postVote,setCurrentCategory,fetchAllPosts} from '../actions'
import Divider from 'material-ui/Divider';
import {withRouter,Link} from 'react-router-dom'
import '../styles/index.css'
import _ from 'lodash'

class CategoryPostDetailView extends Component {

  componentDidMount(){
    this.props.fetchAllPosts()
  }

  render() {
    const {deletePost,postVote,posts,sortedCategory,match} = this.props
    let filteredPosts = posts.filter((thisPost)=>thisPost.category===match.params.category)
    let sortedPosts = _.sortBy(filteredPosts,sortedCategory)

    if(match.params.category===undefined || match.params.category===null){
      return <ErrorView/>
    } else return (
      <div>
        {sortedPosts.map((post)=>(
            <Card key={post.id}>
              <Link to={`/${post.category}/posts/${post.id}`}><CardHeader
                style={{cursor:'pointer'}}
                title={post.title}
                subtitle={post.author+" - "+post.body}
                >
              </CardHeader></Link>

              <CardText>
                <span>
                  <span className="addCommentFont">{post.voteScore} </span>
                  <i onClick={()=>{postVote(post.id,'upVote')}} className="material-icons addCommentFont">thumb_up</i>
                  <i onClick={()=>{postVote(post.id,'downVote')}} className="material-icons addCommentFont">thumb_down</i>
                  <Link to={`/${post.category}/posts/${post.id}`}><i className="material-icons addCommentFont">edit</i></Link>
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
    posts: postReducer.posts,
    comments: initialState.commentReducer.comments,
    currentCategory: initialState.categoryReducer.currentCategory
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPost: (post) => dispatch(setPost(post)),
    deletePost: (post) => dispatch(deletePost(post)),
    postVote: (id,option) => dispatch(postVote(id,option)),
    fetchAllPosts: () => dispatch(fetchAllPosts()),
    setCurrentCategory: (category) => dispatch(setCurrentCategory(category))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CategoryPostDetailView));
