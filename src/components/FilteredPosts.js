import React, { Component } from 'react'
import ToolbarView from './ToolbarView'
import PostDetailView from './PostDetailView'
import {withRouter} from 'react-router-dom'
import CategoryPostDetailView from './CategoryPostDetailView'

class FilteredPosts extends Component {
  state = {
    sortedCategory: ''
  }

  sortingCategory = (category) =>{
    this.setState(()=>{
      return {sortedCategory:category}
    })
  }

  render() {
    let {match} = this.props
    return (
      <div className="app">
        <ToolbarView sortingCategory={this.sortingCategory}/>

        {match.path==="/" ? (
          <PostDetailView sortedCategory={this.state.sortedCategory}/>
        ):(
          <CategoryPostDetailView sortedCategory={this.state.sortedCategory}/>
        )}

      </div>
    )
  }
}

export default withRouter(FilteredPosts);
