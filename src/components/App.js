import React, { Component } from 'react'
import Header from './Header'
import HeaderAddPost from './HeaderAddPost'
import PostsList from './PostsList'
import AddPost from './AddPost'
import LandingView from './LandingView'
import SinglePostView from './SinglePostView'
import AllPostsView from './AllPostsView'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import { withRouter } from 'react-router'

class App extends Component {

  render() {

    const {currentCategory,currentPost} = this.props
    let categoryRoute = `/category/${currentCategory}`
    let addPostRoute = `/category/${currentCategory}/addPost`
    let postIdRoute = `/category/${currentCategory}/${currentPost.id}`

    return (
      <div className="app">
        <Route exact path="/" render={()=>(
            <div>
              <Header/>
              <LandingView/>
              <AllPostsView/>
            </div>
          )}
          />

        <Route exact path={categoryRoute} render={()=>(
          <div>
            <Header/>
            <PostsList/>
          </div>
          )}
          />

        <Route exact path={addPostRoute} render={()=>(
            <div>
              <HeaderAddPost />
              <AddPost/>
            </div>
            )}
          />

        <Route path={postIdRoute} render={()=>(
            <div>
              <Header/>
              <SinglePostView/>
            </div>
            )}
          />

      </div>
    )
  }
}

function mapStateToProps(initialState) {
  return {
    currentCategory: initialState.currentCategory,
    currentPost: initialState.currentPost,
    posts: initialState.posts,
    comments: initialState.comments
  }
}



export default withRouter(connect(mapStateToProps)(App));
