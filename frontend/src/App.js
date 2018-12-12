import React, { Component } from "react";
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

const imgStyle = {
  width: "100%"
};

const gridItem = {
  margin: "20px auto",
  float: "none"
};

let userPosts = [
  {
    author: "nan",
    url:
      "https://www.gettyimages.fi/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg",
    title: "My First Post",
    createdAt: "Today",
    description: "This was my first post"
  },
  {
    author: "Wibly2",
    url:
      "https://www.gettyimages.fi/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg",
    title: "My second Post",
    createdAt: "Yesterday",
    description: "This was my second post"
  },
  {
    author: "kariez",
    url:
      "https://www.gettyimages.fi/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg",
    title: "My worst Post",
    createdAt: "today",
    description: "Dont"
  }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
            integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
            crossorigin="anonymous"
          />
        </header>
        <NAVBAR />
        <Posts items={userPosts} />
      </div>
    );
  }
}

class Posts extends Component {
  constructor(props) {
    super(props);
  }
  Item() {
    let items = [];
    for (var i = this.props.items.length - 1; i >= 0; i--) {
      items.push(
        <Col sm={12} md={8} style={gridItem}>
          <h3>{this.props.items[i].title}</h3>
          <img style={imgStyle} src={this.props.items[i].url} />
          <p>{this.props.items[i].description}</p>
          <p>
            by <a href="#">{this.props.items[i].author}</a>
          </p>
          <p>{this.props.items[i].createdAt}</p>
        </Col>
      );
      if (i != 0) {
        items.push(<hr />);
      }
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

class NAVBAR extends Component {
  render() {
    return (
      <Navbar inverse fixedTop collapseOnSelect>
        <Grid style={{ color: "#fff" }}>
          <Row className="show-grid">
            <Col xs={6} sm={6} md={6} style={{ textAlign: "left" }}>
              <Popup
                trigger={
                  <FontAwesomeIcon
                    href="#brand"
                    id="basic-nav-dropdown"
                    icon={faCamera}
                    style={{ fontSize: "30px", marginTop: "10px" }}
                  />
                }
                modal
                closeOnDocumentClick>
                <table>
                  <tr>
                    <td>
                      <input type="text" placeholder="Image Url" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" placeholder="Title" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" placeholder="Description" />
                    </td>
                  </tr>
                </table>
              </Popup>
            </Col>
            <Col xs={6} sm={6} md={6} style={{ textAlign: "right" }}>
              <a href="#" style={{ color: "white", textDecoration: "none" }}>
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
