import React, { Component } from 'react'
import {connect} from 'react-redux'
import {CardText} from 'material-ui/Card'
import AddPostButton from './AddPostButton'
import {fetchAllPosts} from '../actions'
import PostDetailView from './PostDetailView'

class PostsList extends Component {

  styles={
    cursor: 'pointer',
    fontSize: '18px'
  }

  render() {
    const {posts,currentCategory} = this.props
    return (
      <div>
          {posts.filter((post)=>post.category===currentCategory).map((post)=>(
            <PostDetailView key={post.id} post={post} />
          ))}
          <CardText style={{textAlign:'center'}} >
            <AddPostButton/>
          </CardText>
      </div>
    )

  }
}

function mapStateToProps(initialState) {
  return {
    posts: initialState.posts,
    currentCategory: initialState.currentCategory
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchAllPosts: ()=>dispatch(fetchAllPosts())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(PostsList)
