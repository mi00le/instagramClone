import React, { Component } from "react";
import axios from "axios";
import qs from "qs";
import "./App.css";
import { Grid, Row, Col } from "react-bootstrap";

import Navbar from "./Components/Navbar/";
import Login from "./Components/Login/";
import Posts from "./Components/Posts/";

const amountToAdd = 10;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      username: localStorage.getItem("username"),
      userId: localStorage.getItem("id"),
      postCount: 5,
      id: 0,
    };
    this.refreshPosts();

    this.updateInfo = this.updateInfo.bind(this);
    this.refreshPosts = this.refreshPosts.bind(this);
    this.login = this.login.bind(this);
    this.loadMorePosts = this.loadMorePosts.bind(this);
    this.userClick = this.userClick.bind(this);
    this.checkUser = this.checkUser.bind(this);
  }

  checkUser(){
  localStorage.clear();
  this.setState({
     username: null
   });
 }

  updateInfo() {
    const u = document.querySelector("#imgUrl");
    const t = document.querySelector("#title");
    const d = document.querySelector("#desc");
    const tag = document.querySelector("#tags");


    let a = document.querySelectorAll('.react-tagsinput-tag');

    let tagArr = [];
    for(let i = 0; i < a.length; i++){
      tagArr.push(a[i].innerText);
    }
    tagArr = JSON.stringify(tagArr);

    axios.post("http://localhost:3002/posts/1", qs.stringify({image: u.value, title: t.value, description: d.value, username: "BestUser", tags: tagArr}))
    .then((res) => {
      if (res.data.post) {
        this.setState({posts: [res.data.post, ...this.state.posts]});
      } else {
        this.refreshPosts();
      }
    }).catch(() => {});
  }
  refreshPosts() {
    if (!this.state.id) {
      axios.get("http://localhost:3002/posts?limit=" + this.state.postCount)
      .then((response) => {
        this.setState({
          posts: response.data.posts
        });
      }).catch(() => {});
    }
    else {
      axios.get("http://localhost:3002/posts/"+ this.state.id)
      .then((response) => {
        this.setState({
          posts: response.data.posts
        });
      }).catch(() => {});
    }
  }
  loadMorePosts(){
    this.setState({
      postCount: this.state.postCount + amountToAdd,
    }, () => {
      this.refreshPosts();
    });
  }

  userClick(id){
    this.setState({
      id: id
    }, () => {
      this.refreshPosts();
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

export default App;
