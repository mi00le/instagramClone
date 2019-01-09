import React, { Component } from "react";
import {Col} from "react-bootstrap";
import axios from "axios";
import qs from "qs";

const loginBox = {
  margin : "auto",
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
    position: "relative",
    height: "100vh",
    display: "flex",
    alignItems: "center",
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
    console.log("login");
    axios.post("http://localhost:3002/users/auth", qs.stringify({email: this.state.email,password: this.state.password}))
    .then((res) => {
        if (!res.data.auth.success){throw new Error(res.data.auth.err.message)};
        this.props.sucessFunction(this.state.email, res.data.auth.user.displayName, res.data.auth.user.id, res.data.token);
        console.log("sucess");
    }).catch((err) => {
      console.log("err");
        this.setState({
          email: "",
          password: "",
          errorMsg: err.message,
          register: false
        });
    });
  }
  handleChange = (event) => {
    this.setState({email: event.target.value});
  }
  handleChangePass = (event) => {
    this.setState({password: event.target.value});
  }
  register(){
    const username = document.getElementById('username').value;
    const password2 = document.getElementById('password2').value;

    if (this.state.password != password2) {
      this.setState({
        errorMsg: "Passwords does not match",
      });
      return
    }
    axios.post("http://localhost:3002/users", qs.stringify({email: this.state.email,password: this.state.password, displayName: username}))
    .then((res) => {
      if(!res.data.data.success){throw new Error(res.data.data.err.message)};
      this.props.sucessFunction(this.state.email, username, res.data.data.user.id, res.data.token);
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
        <Col xs={12} sm={6} md={4} style={loginBox}>
          <h1>{this.state.register ? "Register" : "Login"}</h1>
          <hr />
          {this.state.errorMsg && <p className="ErrorMsg">{this.state.errorMsg}</p>}
          <form onSubmit={this.state.register ? this.register : this.login}>
            <h4>Email</h4>
            <input style={loginInput} value={this.state.value} onChange={this.handleChange} id="email" type="email" autoFocus/>
            {this.state.register && <h4>Username</h4>}
            {this.state.register && <input style={loginInput} id="username" type="text"/>}
            <h4>Password</h4>
            <input style={loginInput} value={this.state.value} onChange={this.handleChangePass} id="password" type="password"/>
            {this.state.register && <h4>Confirm password</h4>}
            {this.state.register && <input style={loginInput} id="password2" type="password"/>}
            <input style={loginInput} type="submit" value={this.state.register ? "Register" : "Login"} />
          <a style={{marginBottom: 10, display: "block"}} onClick={this.swapSetting}>{this.state.register ? "Already registered? Login!" : "New? Register!"}</a>
          </form>
        </Col>
      </div>
    );
  }
}
