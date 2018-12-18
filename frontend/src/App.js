import React, { Component } from "react";
import axios from "axios";
import qs from "qs";
import "./App.css";
import { Grid, Row, Col } from "react-bootstrap";

import Navbar from "./Components/Navbar/";
import tools from "./Components/Functions/";

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
  margin: 10,
}

const loginBox = {
  margin : "200px auto",
  float: "none",
  borderStyle: "solid",
  borderColor: "#e6e6e6",
  borderWidth: 1,
  borderRadius: 3,
  padding: "0",
  background: "#fff",
}

const loginInput = {
  width: "80%",
  height: 30,
  margin: "12px auto",
  padding: 2,
  display: "block",
  borderRadius: 3,
  borderWidth: 1,
  borderColor: "#e6e6e6",
}

const profileStyle = {
  margin: "80px auto 40px auto"
}

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
  borderTopWidth: 1}

  const postItem = {
    width: "33.33%",
    border: "solid 1px #e6e6e6",
    borderTopWidth: 0,
    borderBottomWidht: 0,
  }
  const postItemText = {
    margin: 8
  }
  const loginDiv = {
    height: "100%",
    position: "relative",
    height: 800
  }
  
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
    let u = document.querySelector("#imgUrl");
    let t = document.querySelector("#title");
    let d = document.querySelector("#desc");
    let tag = document.querySelector("#tags");

    axios.post("http://localhost:3002/posts/" + this.state.userId, qs.stringify({image: u.value, title: t.value, description: d.value, username: this.state.username, tags: tag.value}))
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
      }).catch(() => {});;
    }
  }
  loadMorePosts(){
    const amount = 10;
    this.setState({
      postCount: this.state.postCount + amount,
    }, () => {
      this.refreshPosts();
    });
  }

  login(email, username, id) {
    this.setState({
      username: username,
      userId: id
    });
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
    localStorage.setItem("id", id);
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
      <div style={this.state.username ? {background: "#f7f7f7"} : {background: "#fff"}} className="App">
      <header>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
      </header>
        <Navbar handler={this.updateInfo} handleLogout={this.checkUser} />
        {this.state.username ? <Posts profile={this.state.id} items={this.state.posts} loadMore={this.loadMorePosts} userClick={this.userClick} /> : <Login sucessFunction={this.login} /> }
      </div>
    );
  }
}
class Profile extends Component{
  constructor(props) {
    super(props);
  }
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

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      register: false,
      errorMsg: ""
    };

    this.swapSetting = this.swapSetting.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  swapSetting(){
    this.setState({
      register: !this.state.register,
      errorMsg: ""
    });
  }

  login(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value
    axios.post("http://localhost:3002/users/auth", qs.stringify({email: email,password: password}))
    .then((res) => {
      if (res.data.success) {
        this.props.sucessFunction(email, "naRandom");
      }else {
        if (res.data.error) {
          this.setState({
            errorMsg: res.data.error.message,
            register: false
          });
        }
      }
    }).catch(() => {});;
  }

  register(){
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;

    if (password != password2) {
      this.setState({
        errorMsg: "Passwords does not match",
      });
      return
    }
    axios.post("http://localhost:3002/users", qs.stringify({email: email,password: password, displayName: username}))
    .then((res) => {
      if (res.data.success) {
        this.props.sucessFunction(email, username, res.data.user.id);
      }else {
        if (res.data.error) {
          this.setState({
            errorMsg: res.data.error.message,
            register: true
          });
        }
      }
    }).catch(() => {});;
  }

  render() {
    return (
      <div style={loginDiv}>
        <Col sm={8} md={4} style={loginBox}>
          <h1>{this.state.register ? "Register" : "Login"}</h1>
          <hr />
          {this.state.errorMsg && <p>{this.state.errorMsg}</p>}
          <h4>Email</h4>
          <input style={loginInput} id="email" type="email" autoFocus/>
          {this.state.register && <h4>Username</h4>}
          {this.state.register && <input style={loginInput} id="username" type="text"/>}
          <h4>Password</h4>
          <input style={loginInput} id="password" type="password"/>
          {this.state.register && <h4>Confirm password</h4>}
          {this.state.register && <input style={loginInput} id="password2" type="password"/>}
          <input style={loginInput} onClick={this.state.register ? this.register : this.login} type="button" value={this.state.register ? "Register" : "Login"} />
          <a style={{marginBottom: 10, display: "block"}} onClick={this.swapSetting}>{this.state.register ? "Already registered? Login!" : "New? Register!"}</a>
        </Col>
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
      <div>
      <Grid>
        <Row className="show-grid">
        {this.props.profile && <Profile newest={this.props.items[0].createdAt} count={this.props.items.length} name={this.props.items[0].username} userClick={this.props.userClick} />}
          {this.props.items.map(post => <Post tags={post.tags} title={post.title} imgUrl={post.url} description={post.description} username={post.username} id={post.userId} createdAt={post.createdAt} userClick={this.props.userClick} />)}
        </Row>
      </Grid>
        {!this.props.profile && <button onClick={this.props.loadMore} style={{width: "100%", height: 40, background: "white", borderWidth: 0, borderTopWidth: 1}}>Load More!</button>}
      </div>
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
        <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
          <div style={postItem}>
            <p style={postItemText}>by <a onClick={() => {this.props.userClick(this.props.id)}}>{this.props.username}</a></p>
          </div>
          <div style={postItem}>
            <p style={postItemText}>{this.props.tags.replace(/"/g, '') ? this.props.tags.replace(/"/g, '').split(",").map((text) => <a style={{margin: "0 3px"}} href="#">{text}</a>) : "no tags"}</p>
          </div>
          <div style={postItem}>
            <p style={postItemText}>{tools.timeSince(new Date(this.props.createdAt))} ago</p>
          </div>
        </div>
      </Col>);
  }
}

export default App;
