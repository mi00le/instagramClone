import React, { Component } from 'react';
// import logo from './logo.svg';
import img from './img.jpg';
import './App.css';
import { Button,Grid,Row,Col,Navbar,Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';


const imgStyle = {

  width : 500,
  heigth : 500

};

//title img auth
let userPost = [{
  title : "Good Morning",
  img : img,
  user : "Michael"
}];

// console.log(userPost[0]);



class App extends Component {

  // state = {
  //   selectedFile : null
  // }
  //
  // fileSelectedHandler = event => {
  //   this.setState({
  //     selectedFile : event.target.files[0]
  //   })
  // }
  //
  // fileUploadHandler = () => {
  //
  // }

  render() {
    return (
      <div className="App">
      <header className="App-header">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
      {/* <input type="file" id="file" onChange={this.fileSelectedHandler}/>
      <label for="fileupload"> Select a file to upload</label>
      <input type="submit" value="submit" onClick={this.fileSelectedHandler} />
      <p>{userPost[0].title}</p>
      <img src={userPost[0].img} style={imgStyle} />
      <p>{userPost[0].user}</p> */}

      <Navbar inverse collapseOnSelect >
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#brand">React-Bootstrap</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav>
      <NavItem eventKey={1} href="#">
        Link
      </NavItem>
      <NavItem eventKey={2} href="#">
        Link
      </NavItem>
      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.3}>Separated link</MenuItem>
      </NavDropdown>
    </Nav>
    <Nav pullRight>
      <NavItem eventKey={1} href="#">
        Link Right
      </NavItem>
      <NavItem eventKey={2} href="#">
        Link Right
      </NavItem>
    </Nav>
  </Navbar.Collapse>
</Navbar>


      <Grid>
        <Row className="show-grid">
          <Col sm={6} md={6}>
            <img src={"https://via.placeholder.com/300"} />
          </Col>
          <Col sm={6} md={6}>
            <img src={"https://via.placeholder.com/300"} />
          </Col>
        </Row>
      </Grid>



      </header>
      </div>
    );
  }
}

export default App;
