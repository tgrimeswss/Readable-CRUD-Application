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

  componentDidMount() {
    this.props.fetchAllPosts()
  }

  render() {
    const {posts,value,currentCategory} = this.props
    return (
      <div>
          {posts.map((post)=>(
            <PostDetailView value={value} key={post.id} post={post} />
          ))}
          <CardText style={{textAlign:'center'}} >
            <AddPostButton value={currentCategory}/>
          </CardText>
      </div>
    )

  }
}

function mapStateToProps(initialState) {
  return {
    posts: initialState.posts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllPosts: (data)=>dispatch(fetchAllPosts(data))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(PostsList)
