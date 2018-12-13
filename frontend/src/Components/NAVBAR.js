import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import Popup from "reactjs-popup";

import {
  Grid,
  Row,
  Col,
  Navbar
} from "react-bootstrap";

const inputStyle = {
  width: "100%",
  textAlign : "center"

};

export default class NAVBAR extends React.Component{

render() {
    return (
      <Navbar fixedTop collapseOnSelect style={{ backgroundColor: "#EDEDED" }}>
        <Grid style={{ color: "#000" }}>
          <Row className="show-grid">
            <Col xs={6} sm={6} md={6} style={{ textAlign: "left" }}>
              <Popup className="w3-animate-top"
                style={{ border: "none", padding: "0px", borderRadius : "20px" }}
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
                <form style={{margin:"50px"}}>
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        id="imgUrl"
                        style={inputStyle}
                        className="form-control"
                        placeholder="Image Url"
                        autoFocus
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        style={inputStyle}
                        className="form-control"
                        id="title"
                        placeholder="Title"
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        style={inputStyle}
                        className="form-control"
                        id="tags"
                        placeholder="Tags"
                        required
                      />
                    </div>
                    <div className="col">
                      <textarea
                        style={inputStyle}
                        className="form-control"
                        id="desc"
                        placeholder="Description"
                        required
                      />
                    </div>
                    <div className="col">
                      <button
                        type="button"
                        id="btn"
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
              <a href="#top" style={{ color: "black", textDecoration: "none" }}>
                <p style={{ fontSize: "30px", marginTop: "10px", float : "right" }}>
                  InstaClone
                </p>
              </a>
            </Col>
          </Row>
        </Grid>
      </Navbar>
    );
  }
};
