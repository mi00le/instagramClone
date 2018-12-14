import React, { Component } from "react";
import axios from "axios";
import qs from "qs";
import "./App.css";
import {
  Button,
  Grid,
  Row,
  Col,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  DropdownButton
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import Popup from "reactjs-popup";

const inputStyle = {
  width: "100%"
};

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
  background: "#fff",
};
const gridText = {
  margin: 10,
}
const loginBox = {
  margin : "80px auto",
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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      username: sessionStorage.getItem("username"),
    };
    this.refreshPosts();

    this.updateInfo = this.updateInfo.bind(this);
    this.refreshPosts = this.refreshPosts.bind(this);
    this.login = this.login.bind(this);
  }
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

  login(email, username) {
    this.setState({
      username: email,
    });
    sessionStorage.setItem("username", email)
  }


  render() {
    return (
      <div style={{background: "#f7f7f7"}} className="App">
      <header>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
      </header>
        <NAVBAR handler={this.updateInfo} />

        {this.state.username ? <Posts items={this.state.posts} /> : <Login sucessFunction={this.login} /> }
      </div>
    );
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
    this.loginHandler = this.loginHandler.bind(this);
    this.register = this.register.bind(this);
  }

  swapSetting(){
    this.setState({
      register: !this.state.register,
      errorMsg: ""
    });
  }

  loginHandler(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value
    axios.post("http://localhost:3002/users/auth", qs.stringify({email: email,password: password}))
    .then((res) => {
      if (res.data.success) {
        this.props.sucessFunction(email);
      }else {
        if (res.data.error) {
          this.setState({
            errorMsg: res.data.error.message,
            register: false
          });
        }
      }
    });
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
      console.log(res);
      if (res.data.success) {
        this.props.sucessFunction(email);
      }else {
        if (res.data.error) {
          this.setState({
            errorMsg: res.data.error.message,
            register: true
          });
        }
      }
    });
  }

  render() {
    return (
      <Col sm={8} md={4} style={loginBox}>
        <h1>{this.state.register ? "Register" : "Login"}</h1>
        {this.state.errorMsg && <p>{this.state.errorMsg}</p>}
        <input style={loginInput} id="email" type="email" placeholder="Email addres" autoFocus/>
        {this.state.register && <input style={loginInput} id="username" type="text" placeholder="Username"/>}
        <input style={loginInput} id="password" type="password" placeholder="Password"/>
        {this.state.register && <input style={loginInput} id="password2" type="password" placeholder="Confirm password"/>}
        <input style={loginInput} onClick={this.state.register ? this.register : this.loginHandler} type="button" value={this.state.register ? "Register" : "Login"} />
        <a onClick={this.swapSetting}>{this.state.register ? "Already registered? Login!" : "New? Register!"}</a>
      </Col>
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

class NAVBAR extends Component {
  render() {
    return (
      <Navbar fixedTop collapseOnSelect style={{ backgroundColor: "#EDEDED" }}>
        <Grid style={{ color: "#000" }}>
          <Row className="show-grid">
            <Col xs={6} sm={6} md={6} style={{ textAlign: "left" }}>
              <Popup
                style={{ border: "none", padding: "0px" }}
                trigger={
                  <FontAwesomeIcon
                    href="#brand"
                    id="basic-nav-dropdown"
                    icon={faCamera}
                    style={{ fontSize: "35px", marginTop: "15px" }}
                  />
                }
                modal
                closeOnDocumentClick
              >
                <form style={inputStyle}>
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        id="imgUrl"
                        style={inputStyle}
                        className="form-control"
                        placeholder="Image Url"
                        autoFocus
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        style={inputStyle}
                        className="form-control"
                        id="title"
                        placeholder="Title"
                      />
                    </div>
                    <div className="col">
                      <textarea
                        style={inputStyle}
                        className="form-control"
                        id="desc"
                        placeholder="Description"
                      />
                    </div>
                    <div className="col">
                      <button
                        type="button"
                        style={inputStyle}
                        className="form-control btn-primary"
                        onClick={this.props.handler}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </form>
              </Popup>
            </Col>
            <Col xs={6} sm={6} md={6} style={{ textAlign: "right" }}>
              <a href="#" style={{ color: "black", textDecoration: "none" }}>
                <p style={{ fontSize: "30px", marginTop: "10px" }}>
                  InstaClone
                </p>
              </a>
            </Col>
          </Row>
        </Grid>
      </Navbar>
    );
  }
}

export default App;
