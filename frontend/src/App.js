import React, { Component } from "react";
import axios from "axios";
import qs from "qs";
import "./App.css";
import { Grid, Row, Col } from "react-bootstrap";

import Navbar from "./Components/Navbar/index.js";

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
const gridText = {
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
  }
  updateInfo() {
    let u = document.querySelector("#imgUrl");
    let t = document.querySelector("#title");
    let d = document.querySelector("#desc");


    let a = document.querySelectorAll('.react-tagsinput-tag');

    let tagArr = [];
    for(let i = 0; i < a.length; i++){
      tagArr.push(a[i].innerText);
      console.log(tagArr);
    }
    console.log(tagArr);
    tagArr = JSON.stringify(tagArr);
    console.log(tagArr);

    axios.post("http://localhost:3002/posts/1", qs.stringify({image: u.value, title: t.value, description: d.value, username: "BestUser", tags: tagArr}))
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
        </header>
        <Navbar handler={this.updateInfo} handleLogout={this.checkUser} handleChange={this.state.tags}/>
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
          {this.props.items.map(post => <Post title={post.title} imgUrl={post.url} description={post.description} username={post.username} createdAt={post.createdAt} tags={post.tags}/>)}
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
        <p>{this.props.tags}</p>
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
