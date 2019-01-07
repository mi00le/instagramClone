import React, { Component } from "react";
import {Col, Grid, Row} from "react-bootstrap";
import Profile from "./../Profile";
import Post from "./../Post";

export default class Posts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <Grid>
        <Row className="show-grid">
        {this.props.profile && <Profile newest={this.props.items[0].createdAt} count={this.props.items.length} name={this.props.items[0].username} userClick={this.props.userClick} />}
          {this.props.items.map(post => <Post tags={post.tags} title={post.title} imgUrl={post.url} description={post.description} username={post.username} id={post.userId} createdAt={post.createdAt} userClick={this.props.userClick} />)}
        </Row>
      </Grid>
        {!this.props.profile && <button onClick={this.props.loadMore} style={{width: "100%", height: 40, background: "white", borderWidth: 0, borderTopWidth: 1}}>Load More!</button>}
      </div>
    );
  }
}
