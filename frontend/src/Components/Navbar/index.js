import React from "react";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
// import Tags from "../../Components/Tags/index.js";

import Popup from "reactjs-popup";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

import { Grid, Row, Col, Navbar as BSNavbar } from "react-bootstrap";

const tagLength = 10;

export default class Navbar extends React.Component {
  constructor() {
    super();
    this.state = { tags: [], tag: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  handleChange(tags) {
    this.setState({ tags });
  }
  
  handleChangeInput(tag) {
    if(tag.length <= tagLength){
      this.setState({ tag });
    }
  }
  render() {
    return (
      <BSNavbar fixedTop collapseOnSelect className="navbar-main">
        <Grid className="grid">
          <Row className="show-grid">
            <Col xs={4} className="col-left">
              <Popup
                className="w3-animate-top popup"
                trigger={
                  <FontAwesomeIcon
                    href="#brand"
                    id="basic-nav-dropdown"
                    icon={faCamera}
                    className="camera-icon"
                  />
                }
                modal
                closeOnDocumentClick
              >
                <div className="form-container">
                  <div className="row">
                    <div className="col-25">
                      <label>Image</label>
                    </div>
                    <div className="col-75">
                      <input
                        type="text"
                        id="imgUrl"
                        className="form-control"
                        placeholder="Enter image url.."
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-25">
                      <label>Title</label>
                    </div>
                    <div className="col-75">
                      <input
                        type="text"
                        id="title"
                        className="form-control"
                        placeholder="Enter a title.."
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-25">
                      <label>Tags</label>
                    </div>
                    <div className="col-75">
                      <TagsInput
                        maxTags="3"
                        value={this.state.tags}
                        onChange={this.handleChange.bind(this)}
                        inputValue={this.state.tag}
                        onChangeInput={this.handleChangeInput.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-25">
                      <label>Subject</label>
                    </div>
                    <div className="col-75">
                      <textarea
                        id="desc"
                        className="form-control"
                        name="subject"
                        placeholder="Write something.."
                        style={{ height: "200px" }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <button
                      id="btn"
                      className="form-control btn-primary"
                      onClick={this.props.handler}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </Popup>
            </Col>
            <Col xs={4} className="col-right">
              <a href="#top" className="insta-clone">
                <p className="insta-clone disable-select ">InstaClone</p>
              </a>
            </Col>
            <Col xs={4} className="col-right">
              <a
                href="#logout"
                className="logout-nav"
                onClick={this.props.handleLogout}
              >
                <p className="logout-nav disable-select ">Logout</p>
              </a>
            </Col>
          </Row>
        </Grid>
      </BSNavbar>
    );
  }
}
