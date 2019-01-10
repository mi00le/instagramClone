import React, { Component } from "react";
import axios from "axios";
import qs from "qs";
import { connect } from 'react-redux'
import "./App.css";
import { actions } from './store/modules/user'

import Navbar from "./Components/Navbar/";
import Login from "./Components/Login/";
import Posts from "./Components/Posts/";

const deafultPostCount = 5;
const amountToAdd = 10;

export class App extends Component {
  state = {
    posts: [],
    username: localStorage.getItem("username"),
    userId: localStorage.getItem("id"),
    postCount: 5,
    id: 0,
  };

  componentDidMount() {
    this.refreshPosts();
    this.props.getUser(this.props.userId)
  }

  checkUser = () => {
    localStorage.clear();
    this.setState({
      username: null

    });

  }

  updateInfo = async () => {
    const {
      userId,
      username,
    } = this.state

    const u = document.querySelector("#imgUrl");
    const t = document.querySelector("#title");
    const d = document.querySelector("#desc");
    const tag = document.querySelector("#tags");

    try {
      const res = await axios.post(
        `http://localhost:3002/posts/${userId}`,
        qs.stringify({
          username,
          image: u.value,
          title: t.value,
          description: d.value,
          tags: tag.value
        }),
      )

      if (res.data.post) {
        this.setState({ posts: [res.data.post, ...this.state.posts] });
      } else {
        this.refreshPosts();
      }
    } catch (e) {
      console.error(e)
    }
  }

  refreshPosts = () => {
    if (!this.state.id) {
      axios.get("http://localhost:3002/posts?limit=" + this.state.postCount)
        .then((response) => {
          this.setState({
            posts: response.data.posts
          });
        }).catch(() => { });
    }
    else {
      axios.get("http://localhost:3002/posts/" + this.state.id)
        .then((response) => {
          this.setState({
            posts: response.data.posts
          });
        }).catch(() => { });
    }
  }

  loadMorePosts = () => {
    this.setState({
      postCount: this.state.postCount + amountToAdd,
    }, () => {
      this.refreshPosts();
    });
  }

  login = (email, username, id, token) => {
    this.setState({
      username: username,
      userId: id
    });
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
  }

  userClick = (id) => {
    this.setState({
      id: id,
      postCount: deafultPostCount
    }, () => {
      this.refreshPosts();
    });
  }

  render() {
    return (
      <div style={{marginTop: this.state.username ? 30 : 0}} className="App">
        {this.props.isLoggedIn ? <Navbar handler={this.updateInfo} handleLogout={this.props.logout} /> || <Posts profile items={this.state.posts} loadMore={this.loadMorePosts} userClick={this.userClick} /> : <Login sucessFunction={this.login} />}
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  isLoggedIn: user.auth,
  userId: user.id,
})

const mapDispatchToProps = dispatch => ({
  getUser: (id) => dispatch(actions.getUser(id)),
  logout : () => dispatch(actions.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
