import React, { Component } from "react";
import axios from "axios";
import qs from "qs";
import "./App.css";
import { Grid, Row, Col } from "react-bootstrap";

import NAVBAR from "./Components/NAVBAR.js";

let date = new Date().toLocaleString();

const imgStyle = {
  width: "100%"
};


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
let gridText = {
  margin: 10
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      username : sessionStorage.getItem("username")
    };
    this.updateInfo = this.updateInfo.bind(this);
    this.checkUser = this.checkUser.bind(this);
    this.refreshPosts = this.refreshPosts.bind(this);
    
    this.refreshPosts();
    

  }
    checkUser(){
    sessionStorage.clear();
    this.setState({
       username: null
     });
  
  updateInfo() {
    let u = document.querySelector("#imgUrl");
    let t = document.querySelector("#title");
    let d = document.querySelector("#desc");

    axios.post("http://localhost:3002/posts/1", qs.stringify({image: u.value, title: t.value, description: d.value, username: "BestUser", tags: {}}))
    .then((res) => {
      if (res.data.post) {
        this.setState({posts: [res.data.post, ...this.state.posts]});
      } else {
        this.refreshPosts();
      }
    });
  }
  refreshPosts() {
    axios.get("http://localhost:3002/posts")
    .then((response) => {
      this.setState({
        posts: response.data.posts
      });
    });
  }


  render() {
    return (
      <div className="App">
        <header>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
            integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
            crossOrigin="anonymous"
          />
          <script
            src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha256-3edrmyuQ0w65f8gfBsqowzjJe2iM6n0nKciPUp8y+7E="
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Lobster"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://www.w3schools.com/w3css/4/w3.css"
          />
        </header>
        <NAVBAR handler={this.updateInfo} handleLogout={this.checkUser} />
        <Posts items={this.state.posts} />
      </div>
    );
  }
}

class Posts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          {this.props.items.map(post => <Post title={post.title} imgUrl={post.url} description={post.description} username={post.username} createdAt={post.createdAt} />)}
        </Row>
      </Grid>
    );
  }
}

class Post extends Component {
  render() {
    return (
      <Col sm={12} md={8} style={gridItem}>
        <h3 style={gridText}>{this.props.title}</h3>
        <img style={imgStyle} src={this.props.imgUrl} />
        <div style={{width: "70%", margin: "0 auto"}}>
        <p style={{margin: 10}}>{this.props.description}</p>
        </div>
        <hr style={{margin: 0}}/>
        <div style={{width: "70%", margin: "0 auto"}}>
          <p style={{textAlign: "left", display: "inline-block", width: "50%", margin: "10px 0"}}>by <a href="#">{this.props.username}</a></p>
          <p style={{textAlign: "right", display: "inline-block", width: "50%", margin: "10px 0"}}>{new Date(this.props.createdAt).toDateString()}</p>
        </div>
      </Col>);
  }
}

export default App;
