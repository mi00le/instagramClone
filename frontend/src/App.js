import React, { Component } from "react";
import "./App.css";
import { Grid, Row, Col } from "react-bootstrap";

import NAVBAR from "./Components/NAVBAR.js";

let date = new Date().toLocaleString();

const imgStyle = {
  width: "100%"
};

let gridItem = {
  margin: "60px auto",
  float: "none",
  borderStyle: "solid",
  borderColor: "#e6e6e6",
  borderWidth: 1,
  borderRadius: 3,
  padding: "0",
  background: "#fff"
};
let gridText = {
  margin: 10
};

let userPosts = [
  {
    author: "nan",
    url:
      "https://www.gettyimages.fi/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg",
    title: "My First Post",
    createdAt: "date",
    description:
      "REEEEEEEEEEEEEEEEEEEEEEEEEEE SPAM SPAM SPAM SPAM SPAM SPAM SPAM SPAM margin: 10 margin: 10margin: 10margin: 10margin: 10margin: 10margin: 10margin: 10margin: 10margin: 10"
  },
  {
    author: "Wibly2",
    url:
      "https://www.gettyimages.fi/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg",
    title: "My second Post",
    createdAt: "date",
    description: "This was my second post"
  },
  {
    author: "kariez",
    url:
      "https://www.gettyimages.fi/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg",
    title: "My worst Post",
    createdAt: "date",
    description: "Dont"
  }
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: userPosts,
      username : sessionStorage.getItem("username")
    };
    console.log(this.state.username);
    this.updateInfo = this.updateInfo.bind(this);
    this.checkUser = this.checkUser.bind(this);
  }
  updateInfo() {
    let u = document.querySelector("#imgUrl");
    let t = document.querySelector("#title");
    let d = document.querySelector("#desc");

    if (
      u.value.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/) != null
    ) {
      userPosts.push({
        author: "kariez",
        url: u.value,
        title: t.value,
        createdAt: date,
        description: d.value
      });

      this.setState({
        posts: userPosts
      });
    } else {
      u.style.border = "2px solid red";
    }
  }
  checkUser(){
    sessionStorage.clear();
    this.setState({
       username: null
     });
  }

  render() {
    return (
      <div className="App">
        <header>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
            integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
            crossOrigin="anonymous"
          />
          <script
            src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha256-3edrmyuQ0w65f8gfBsqowzjJe2iM6n0nKciPUp8y+7E="
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Lobster"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://www.w3schools.com/w3css/4/w3.css"
          />
        </header>
        <NAVBAR handler={this.updateInfo} handleLogout={this.checkUser} />
        <Posts items={this.state.posts} />
      </div>
    );
  }
}

class Posts extends Component {
  Item() {
    let items = [];
    for (var i = this.props.items.length - 1; i >= 0; i--) {
      items.push(
        <Col sm={12} md={8} style={gridItem}>
          <h3 style={gridText}>{this.props.items[i].title}</h3>
          <img alt="" style={imgStyle} src={this.props.items[i].url} />
          <div style={{ width: "70%", margin: "0 auto" }}>
            <p style={{ margin: 10 }}>{this.props.items[i].description}</p>
          </div>
          <hr style={{ margin: 0 }} />
          <div style={{ width: "70%", margin: "0 auto" }}>
            <p
              style={{
                textAlign: "left",
                display: "inline-block",
                width: "50%",
                margin: "10px 0"
              }}
            >
              by <a href="#by">{this.props.items[i].author}</a>
            </p>
            <p
              style={{
                textAlign: "right",
                display: "inline-block",
                width: "50%",
                margin: "10px 0"
              }}
            >
              {this.props.items[i].createdAt}
            </p>
          </div>
        </Col>
      );
    }
    return items;
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">{this.Item()}</Row>
      </Grid>
    );
  }
}

export default App;
