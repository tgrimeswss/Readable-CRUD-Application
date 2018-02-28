import React, { Component } from 'react'
import Header from './Header'
import HeaderAddPost from './HeaderAddPost'
import PostsList from './PostsList'
import AddPost from './AddPost'
import {Route} from 'react-router-dom'

class App extends Component {

  state = {
    categories: [],
    posts: [],
    comments: [],
    value: ''
  }

  setCategory = (event, index, value) =>{
    this.setState({value:event});
  }

  render() {
    const {value} = this.state
    return (
      <div className="app">

        <Route exact path="/" render={()=>(
          <div>
            <Header value={value} setCategory={this.setCategory}/>
            <PostsList value={value}/>
          </div>
          )}
          />

        <Route path="/addPost" render={()=>(
            <div>
              <HeaderAddPost value={value} setCategory={this.setCategory}/>
              <AddPost value={value}/>
            </div>
            )}
          />
      </div>
    )
  }
}


export default App;
