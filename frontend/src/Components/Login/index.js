import React, { Component } from "react";
import {Col} from "react-bootstrap";
import axios from "axios";
import qs from "qs";

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
const loginDiv = {
    height: "100%",
    position: "relative",
    height: 800
}

export default class Login extends Component {
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
      console.log(res);
        if (!res.data.auth.success){throw new Error(res.data.auth.err.message)};
        this.props.sucessFunction(email, res.data.auth.user.displayName, res.data.auth.user.id, res.data.auth.token);
    }).catch((err) => {
        console.log(err);
        this.setState({
          errorMsg: err.message,
          register: false
        });
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
      if(!res.data.data.success){throw new Error(res.data.data.err.message)};
      this.props.sucessFunction(email, username, res.data.data.user.id);
    }).catch((err) => {
        this.setState({
          errorMsg: err.message,
          register: true
        });
    });
  }

  render() {
    return (
      <div style={loginDiv}>
        <Col sm={8} md={4} style={loginBox}>
          <h1>{this.state.register ? "Register" : "Login"}</h1>
          <hr />
          {this.state.errorMsg && <p>{this.state.errorMsg}</p>}
          <form>
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
          </form>
        </Col>
      </div>
    );
  }
}
