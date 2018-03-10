import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchAllPosts} from '../actions'
import PostDetailView from './PostDetailView'
import escapeRegExp from 'escape-string-regexp'
import TextField from 'material-ui/TextField';
import {CardText} from 'material-ui/Card'
import AddPostButton from './AddPostButton'

class AllPostsView extends Component {

  state = {
    query:''
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
    const {posts} = this.props
    const match = new RegExp(escapeRegExp(this.state.query),'i')
    const newPostArray = posts.filter((filteredPosts)=>match.test(filteredPosts.category))
    return (


      <div>
        <span>
          <i className="material-icons">search</i>
          <TextField
            onChange={(event)=>this.updateQuery(event)}
            hintText="Search for all post categories here"
            >
          </TextField>
        </span>

        {this.state.query==='' ? (

            posts.map((post)=>(
              <PostDetailView key={post.id} post={post} />
            ))
        ):
        newPostArray.map((post)=>(
          <PostDetailView key={post.id} post={post} />
        ))
        }

        <CardText className="centerText" >
          <AddPostButton/>
        </CardText>

      </div>
    )

  }
}

function mapStateToProps(initialState) {
  return {
    posts: initialState.postReducer.posts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllPosts: (data)=>dispatch(fetchAllPosts(data))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(AllPostsView)
