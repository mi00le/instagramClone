import React, { Component } from "react";
import {timeSince} from "./../../utils/date";
import {Col, Grid} from "react-bootstrap";
import { connect } from 'react-redux'

const gridItem = {
  margin : "50px auto",
  float: "none",
  borderStyle: "solid",
  borderColor: "#e6e6e6",
  borderWidth: 1,
  borderRadius: 3,
  padding: "0",
  background: "#fff"
};
const gridText = {
  margin: 10,
};
const postItem = {
  width: "33.33%",
  border: "solid 1px #e6e6e6",
  borderTopWidth: 0,
  borderBottomWidht: 0,
};
const postItemText = {
  margin: 8
};
const imgStyle = {
  width: "100%"
};

export default class Post extends Component {
  render() {
    return (
      <Col sm={12} md={8} style={gridItem}>
        <h3 style={gridText}>{this.props.title}</h3>
        <img style={imgStyle} src={this.props.imgUrl} />
        <div style={{width: "70%", margin: "0 auto"}}>
        <p style={{margin: 10}}>{this.props.description}</p>
        </div>
        <hr style={{margin: 0}}/>
        <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
          <div style={postItem}>
            <p style={postItemText}>by <a onClick={() => {this.props.userClick(this.props.id)}}>{this.props.username}</a></p>
          </div>
          <div style={postItem}>
            {<p style={postItemText}>{this.props.tags.replace(/"/g, '') ? this.props.tags.replace(/"/g, '').split(",").map((text) => <a style={{margin: "0 3px"}} href="#">{text}</a>) : "no tags"}</p>}
          </div>
          <div style={postItem}>
            <p style={postItemText}>{timeSince(new Date(this.props.createdAt))} ago</p>
          </div>
        </div>
      </Col>);
  }
}
