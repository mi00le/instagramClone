import React, {Component} from "react";
import {Col} from "react-bootstrap";

const profileStyle = {
  margin: "80px auto 40px auto"
};
const flexItem = {
  padding: "3px 7px",
  margin: "5px 20px" ,
  border: "1px solid #e6e6e6",
  background: "#fff",
  borderRadius: 3,
};
const profileButton = {
  margin: 12,
  width: "30%",
  height: 40,
  background: "white",
  borderWidth: 0,
  borderTopWidth: 1
};

export default class Profile extends Component{
  render () {
    return (
      <div style={profileStyle}>
        <h2>{this.props.name}</h2>
        <div style={{display: "flex", justifyContent: "center"}}>
          <Col xs={6} sm={4} md={3} style={flexItem}><h4>Posts: {this.props.count}</h4></Col>
          <Col xs={6} sm={4} md={3} style={flexItem}><h4>Newest: {new Date(this.props.newest).toLocaleDateString()}</h4></Col>
        </div>
        <button style={profileButton} onClick={() => {this.props.userClick(0)}}>Go back!</button>
        <hr style={{margin: "20px 0 auto", background: "black"}} />
      </div>
    )
  }
}
