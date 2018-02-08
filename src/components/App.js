import React, { Component } from 'react';
import ThreadContainer from './ThreadContainer'
import API from '../api-server/categories'

class App extends Component {

  state = {
    categories:[]
  }

  componentDidMount() {
    API.getAll().then((catArray)=>{
      this.setState((state)=>{
        state.categories=catArray.categories
        console.log('state within API invocation: ',state)
      })
    })

  }

  render() {
    return (
      <div className="app">
        {console.log('rerendered state: ',this.state.categories)}
        <ThreadContainer theState={this.state}/>
      </div>
    );
  }
}

export default App;
