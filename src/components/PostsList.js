import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import {connect} from 'react-redux'
import AddPostButton from './AddPostButton'
import {fetchComments} from '../actions'
import commentsAPI from '../api-server/comments'

class PostsList extends Component {

  state={
    postBoxOpen:false,
    posts: [],
    comments: []
  }

  styles={
    cursor: 'pointer',
    fontSize: '18px'
  }

  changePostBox = () => {
    this.setState({postBoxOpen:true})
  }

  fetchComments = (token,parentId) => {
    commentsAPI.getByParent(token,parentId).then((comments)=>{
      this.setState((state)=>{
        return state.comments = comments
      })
    })
  }

  render() {
    const {posts,value} = this.props
    const {comments} = this.state
    const commentBody = (author,content) => {
      return (
        <span><em>
          {author}</em> - {content}
          <i style={this.styles} className="material-icons">thumb_up</i>
          <i style={this.styles} className="material-icons">thumb_down</i>
        </span>)
    }
    const header = (content) => {return (<h3>{content}</h3>)}
    const body = (author,body) =>{return (
      <h4><em>{author}</em> - {body} ---
        <i style={this.styles} className="material-icons">thumb_up</i>
        <i style={this.styles} className="material-icons">thumb_down</i>
      </h4>
    )}
    return (
      <div>
          {posts.filter((post)=>post.category===value).map((post)=>(
            <MuiThemeProvider key={post.id}>
              <Card onExpandChange={()=>{fetchComments('token',post.id)}}>
                <CardHeader
                  title={header(post.title)}
                  subtitle={body(post.author,post.body)}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
              {comments.map((comment)=>(
                <CardText key={comment.id} expandable={true}>
                  {commentBody(comment.author,comment.body)}
                </CardText>
              ))}
              </Card>
            </MuiThemeProvider>
          ))}
          <AddPostButton value={value}/>
      </div>
    )
  }
}

function mapStateToProps(initialState) {
  return {
    posts: initialState.posts,
    comments: initialState.comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComments: (data) => dispatch(fetchComments(data))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(PostsList)
