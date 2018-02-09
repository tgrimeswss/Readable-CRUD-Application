import React, { Component } from 'react';
import ThreadContainer from './ThreadContainer'
import categoryAPI from '../api-server/categories'
import Header from './Header'
import {connect} from 'react-redux'

class App extends Component {

  state = {
    categories: [],
    value: ''
  }

  handleChange = (event, index, value) =>{
    this.setState({value});
    console.log(value)
  }

  componentDidMount() {
    categoryAPI.getAll().then((catArray) => {
      this.setState((state)=>{
        return catArray
      })
    })
  }
  render() {
    return (
      <div className="app">
        {console.log(this.props)}
        <Header/>
        <ThreadContainer value={this.state.value} handleChange={this.handleChange} categories={this.state.categories}/>
      </div>
    )
  }
}

function mapStateToProps(initialState) {
  return {
    
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}



export default connect(mapStateToProps,mapDispatchToProps)(App);
