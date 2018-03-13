import React, { Component } from 'react'
import Header from './Header'
import AddPost from './AddPost'
import FilteredPosts from './FilteredPosts'
import LandingView from './LandingView'
import SinglePostView from './SinglePostView'
import {Route} from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <div>
            <Header/>
            <LandingView/>
            <FilteredPosts/>
          </div>
          )}
          />

        <Route exact path={"/:category/posts"} render={()=>(
          <div>
            <Header/>
            <FilteredPosts/>
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

        <Route exact path={"/:category/posts/:id"} render={()=>(
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

export default App;
