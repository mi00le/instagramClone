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

    axios.defaults.headers.common['x-access-token'] = localStorage.getItem("token");
    axios.post("http://localhost:3002/posts/" + this.state.userId , qs.stringify({image: u.value, title: t.value, description: d.value, username: this.state.username, tags: tag.value}))
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

  login(email, username, id, token) {
    this.setState({
      username: username,
      userId: id
    });
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
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
      <div style={{background: this.state.username ? "#f7f7f7" : "#fff"}} className="App">
      <header>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
      </header>
        <Navbar handler={this.updateInfo} handleLogout={this.checkUser} />
        {this.state.username ? <Posts profile={this.state.id} items={this.state.posts} loadMore={this.loadMorePosts} userClick={this.userClick} /> : <Login sucessFunction={this.login} /> }
      </div>
    );
  }
}

export default App;
