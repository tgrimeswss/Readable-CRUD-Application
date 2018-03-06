import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchAllPosts} from '../actions'
import PostDetailView from './PostDetailView'
import escapeRegExp from 'escape-string-regexp'
import TextField from 'material-ui/TextField';

class PostsList extends Component {

  state = {
    query:''
  }

  styles={
    cursor: 'pointer',
    fontSize: '18px'
  }

  updateQuery=(event)=>{
    event.persist()
    this.setState((state)=>{
      return {query:event.target.value}
    })
  }

  componentDidMount() {
    this.props.fetchAllPosts()
  }

  render() {
    const {posts,value} = this.props
    const match = new RegExp(escapeRegExp(this.state.query),'i')
    const newPostArray = posts.filter((filteredPosts)=>match.test(filteredPosts.category))
    return (


      <div>
        <span>
          <i className="material-icons">search</i>
          <TextField
            onChange={(event)=>this.updateQuery(event)}
            hintText="Search all posts here"
            >
          </TextField>
        </span>


        {this.state.query==='' ? (
          <div></div>
        ):
        newPostArray.map((post)=>(
          <PostDetailView value={value} key={post.id} post={post} />
        ))
        }

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

// posts.map((post)=>(
//   <PostDetailView value={value} key={post.id} post={post} />
// ))


export default connect(mapStateToProps,mapDispatchToProps)(PostsList)
