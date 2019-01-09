import React, { Component } from "react";
import { connect } from "react-redux";
import {Col, Grid, Row} from "react-bootstrap";
import Profile from "./../Profile";
import Post from "./../Post";


class Posts extends Component {
  constructor(props) {
    super(props);

    this.renderAmount = this.renderAmount.bind(this);
  }

  renderAmount(){
    if (this.props.itemCount) {
      return this.props.itemCount;
    }
    else{
      return this.props.items.length
    }
  }

  render() {
    return (
      <div>
      <Grid>
        <Row className="show-grid">
        {this.props.profile && this.props.items.length && <Profile newest={this.props.items[0].createdAt} count={this.props.items.length} name={this.props.items[0].username} userClick={this.props.userClick} />}
          {this.props.items.slice(0, this.renderAmount()).map(post => <Post tags={post.tags} title={post.title} imgUrl={post.url} description={post.description} username={post.username} id={post.userId} createdAt={post.createdAt} userClick={this.props.userClick} />)}
        </Row>
      </Grid>
        <button onClick={this.props.loadMore} style={{width: "100%", height: 40, background: "white", borderWidth: 0, borderTopWidth: 1}}>Load More!</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { articles: state.articles}
}

export default connect(mapStateToProps)(Posts);
