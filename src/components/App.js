import React, { Component } from 'react'
import Header from './Header'
import AddPost from './AddPost'
import PostDetailView from './PostDetailView'
import LandingView from './LandingView'
import SinglePostView from './SinglePostView'
import AllPostsView from './AllPostsView'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import { withRouter } from 'react-router'

class App extends Component {

  render() {
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

        <Route exact path={"/category/:currentCategory"} render={()=>(
          <div>
            <Header/>
            <PostDetailView/>
          </div>
          )}
          />

        <Route exact path={"/addPost"} render={()=>(
            <div>
              <Header/>
              <AddPost/>
            </div>
            )}
          />

        <Route exact path={"/category/:currentCategory/:currentPost"} render={()=>(
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
