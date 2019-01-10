import React from "react";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import Popup from "reactjs-popup";

import { Grid, Row, Col, Navbar as BSNavbar } from "react-bootstrap";

export default class Navbar extends React.Component {
  render() {
    return (
      <BSNavbar fixedTop collapseOnSelect className="navbar-main">
        <Grid className="grid">
          <Row className="show-grid">
            <Col xs={4} className="col-left">
              {this.props.isLoggedIn && <Popup
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
                <form className="form-style">
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        id="imgUrl"
                        className="form-control input-style"
                        placeholder="Image Url"
                        autoFocus
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control input-style"
                        id="title"
                        placeholder="Title"
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control input-style"
                        id="tags"
                        placeholder="Tags"
                        required
                      />
                    </div>
                    <div className="col text-fix">
                      <textarea
                        className="form-control input-style"
                        id="desc"
                        placeholder="Description"
                        required
                      />
                    </div>
                    <div className="col">
                      <button
                        type="button"
                        id="btn"
                        className="form-control btn-primary input-style"
                        onClick={this.props.handler}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </form>
              </Popup>}
            </Col>
            <Col xs={4}className="col-right">
              <a href="#top" className="insta-clone">
                <p className={`disable-select ${this.props.isLoggedIn ? "insta-clone" : "insta-cloneToggle"}`}>InstaClone</p>
              </a>
            </Col>
            <Col xs={4} className="col-right">
              {this.props.isLoggedIn && <a
                href="#logout"
                className="logout-nav"
                onClick={this.props.handleLogout}
              >
                <p className="logout-nav disable-select ">Logout</p>
              </a>}
            </Col>
          </Row>
        </Grid>
      </BSNavbar>
    );
  }
}
