import React, { Component } from 'react'
import {connect} from 'react-redux'
import {CardText} from 'material-ui/Card'
import AddPostButton from './AddPostButton'
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


export default connect(mapStateToProps)(PostsList)
