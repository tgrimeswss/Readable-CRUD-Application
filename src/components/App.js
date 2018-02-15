import React, { Component } from 'react'
import TopicDropdown from './TopicDropdown'
import categoryAPI from '../api-server/categories'
import postsAPI from '../api-server/posts'
import commentsAPI from '../api-server/comments'
import Header from './Header'
import Landing from './Landing'
import {connect} from 'react-redux'
import {addPost,deletePost,addComment,deleteComment} from '../actions'

class App extends Component {

  state = {
    categories: [],
    posts: [],
    comments: [],
    value: ''
  }

  handleChange = (event, index, value) =>{
    this.setState({value});//Sets this.state.value to the users selection in the category dropdown list
    postsAPI.getByCategory('token',value).then((postArray)=>{
      this.setState((state)=>{
        return {posts:postArray}//this.state.posts is now = to the postArray
      })
    })

  }

  componentDidMount() {
    categoryAPI.getAll().then((catArray) => {
      this.setState((state)=> {return catArray})
    })
    postsAPI.getAll().then((postsArray)=>{
      this.setState((state)=>{
        return {postsArray}
      })
    })
  }
  render() {
    const {addPost,addComment,deletePost,deleteComment} = this.props
    const {categories,value} = this.state
    return (
      <div className="app">
        <Header/>
        <TopicDropdown value={value} handleChange={this.handleChange} categories={categories}/>
        <Landing currentTopic={this.state.value} addComment={this.addComment} deleteComment={this.deleteComment}/>
        {this.state.posts.filter((post)=>post.category===this.state.value).map((postArray)=>(

          <div key={postArray.id}>
            <h4>{postArray.title}</h4>
            <p>{postArray.body}</p>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps(initialState) {
  return {
    posts: initialState.posts,
    comments: initialState.comments,
    categories: initialState.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data)),
    deletePost: (data) => dispatch(deletePost(data)),
    addComment: (data) => dispatch(addComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data))
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(App);
