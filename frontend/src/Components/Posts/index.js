import React, { Component } from "react";
import { Grid, Row } from "react-bootstrap";
import Profile from "./../Profile";
import Post from "./../Post";
import { connect } from "react-redux";
import { actions } from '../../store/modules/post'


class Posts extends Component {
  componentDidMount() {
    this.props.getPosts(5);
  }

  render() {
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            {this.props.id && <Profile newest={this.props.posts[0].createdAt} count={this.props.posts.length} name={this.props.posts[0].username} userClick={this.props.userClick} />}
            {this.props.posts.map(post => <Post tags={post.tags} title={post.title} imgUrl={post.url} description={post.description} username={post.username} id={post.userId} createdAt={post.createdAt} userClick={this.props.userClick} />)}
          </Row>
        </Grid>
        <button style={{ width: "100%", height: 40, background: "white", borderWidth: 0, borderTopWidth: 1 }}>Load More!</button>
      </div>
    );
  }
}

const mapStateToProps = ({ post }) => ({
  posts: post.posts,
})

const mapDispatchToProps = dispatch => ({
  getPosts: count => dispatch(actions.getPosts(count)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
