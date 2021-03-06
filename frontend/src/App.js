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
  uploadPost = (imgUrl, title, tags, subject) => {
    const items = {
      imgUrl,
      title,
      tags,
      subject,
      userId: window.localStorage.getItem('id'),
      username: this.props.username
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
  username: user.name
})

const mapDispatchToProps = dispatch => ({
  getUser: (id) => dispatch(actions.getUser(id)),
  logout : () => dispatch(actions.logout()),
  uploadPost : (info) => dispatch(postActions.uploadPost(info)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
