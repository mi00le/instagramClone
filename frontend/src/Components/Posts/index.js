import React, { Component } from "react";
import { Grid, Row } from "react-bootstrap";
import Profile from "./../Profile";
import Post from "./../Post";
import { connect } from "react-redux";
import { actions } from '../../store/modules/post'


class Posts extends Component {
  state = {
    id: 0
  }

  componentDidMount() {
    this.loadMore();
  }
  loadMore = () => {
    if (this.state.id) {
      this.props.getUserPosts(this.state.id);
    }
    else {
      this.props.getPosts(5, this.props.cursor);
    }
  }

  userClick = (id) => {
    this.setState({
      id
    }, () =>{
      this.props.clearPosts();
      this.loadMore();
    });
  }

  shouldDisplayProfile = () => {
    if (this.state.id && this.props.posts.length) {
      return true;
    }
    else {
      return false;
    }
  }

  render() {
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            {this.shouldDisplayProfile() && <Profile newest={this.props.posts[0].createdAt} count={this.props.posts.length} name={this.props.posts[0].username} userClick={this.userClick} />}
            {this.props.posts.map(post => <Post tags={post.tags} title={post.title} imgUrl={post.url} description={post.description} username={post.username} id={post.userId} createdAt={post.createdAt} userClick={this.userClick} />)}
          </Row>
        </Grid>
        <button onClick={this.loadMore} style={{ width: "100%", height: 40, background: "white", borderWidth: 0, borderTopWidth: 1 }}>Load More!</button>
      </div>
    );
  }
}

const mapStateToProps = ({ post }) => ({
  posts: post.posts,
  cursor: post.cursor,
})

const mapDispatchToProps = dispatch => ({
  getPosts: (count, cursor) => dispatch(actions.getPosts(count, cursor)),
  getUserPosts: id => dispatch(actions.getUserPosts(id)),
  clearPosts: () => dispatch(actions.clearPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
