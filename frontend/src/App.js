import React, { Component } from "react";
import axios from "axios";
import qs from "qs";
import { connect } from 'react-redux'
import "./App.css";
import { actions } from './store/modules/user'
import { actions as postActions } from './store/modules/post'

import Navbar from "./Components/Navbar/";
import Login from "./Components/Login/";
import Posts from "./Components/Posts/";

const deafultPostCount = 5;
const amountToAdd = 10;

export class App extends Component {
  state = {
    username: localStorage.getItem("username"),
    userId: localStorage.getItem("id"),
  };

  componentDidMount() {
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

    let a = document.querySelectorAll('.react-tagsinput-tag');

    let tagArr = [];
    for(let i = 0; i < a.length; i++){
      tagArr.push(a[i].innerText);
    }
    try {
      const res = await axios.post(
        `http://localhost:3002/posts/${userId}`,
        qs.stringify({
          username,
          image: u.value,
          title: t.value,
          description: d.value,
          tags: tagArr
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
  uploadPost = (imgUrl, title, tags, subject, userId) => {
    const items = {
      imgUrl,
      title,
      tags,
      subject,
      userId
    }
    this.props.uploadPost(items)
  }

  render() {
    return (
      <div style={{marginTop: this.props.isLoggedIn ? 45 : 0}} className="App">
        <Navbar handler={this.uploadPost} handleLogout={this.props.logout} isLoggedIn={this.props.isLoggedIn} />
        {!this.props.isLoggedIn ?(
            <Login />
        ) : (
          <>
          
          <Posts items={this.state.posts} loadMore={this.loadMorePosts} userClick={this.userClick} />
          </>
        )}
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
  uploadPost : () => dispatch(postActions.uploadPost()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
