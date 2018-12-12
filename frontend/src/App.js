import React, { Component } from 'react';
import './App.css';
import { Button,Grid,Row,Col,Navbar,Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

const imgStyle = {
  width : "100%"
};

let gridItem = {
  margin : "60px auto",
  float: "none",
  borderStyle: "solid",
  borderColor: "#e6e6e6",
  borderWidth: 1,
  borderRadius: 3,
  padding: "0",
  background: "#fff",
};
let gridText = {
  margin: 10,
}

let userPosts = [{author: "nan",
url: "https://www.gettyimages.fi/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg",
title:"My First Post",
createdAt:"Today",
description:"REEEEEEEEEEEEEEEEEEEEEEEEEEE SPAM SPAM SPAM SPAM SPAM SPAM SPAM SPAM margin: 10 margin: 10margin: 10margin: 10margin: 10margin: 10margin: 10margin: 10margin: 10margin: 10"},
{author: "Wibly2",
url: "https://www.gettyimages.fi/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg",
title:"My second Post",
createdAt:"Yesterday",
description:"This was my second post"},
{author: "kariez",
url: "https://www.gettyimages.fi/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg",
title:"My worst Post",
createdAt:"today",
description:"Dont"}]

class App extends Component {
  render() {
    return (
      <div style={{background: "#f7f7f7"}} className="App">
      <header>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
      </header>
        <NAVBAR />

        {userPosts && <Posts items={userPosts} />}
      </div>
    );
  }
}

class Posts extends Component {
  constructor(props) {
    super(props);
  }
  Item () {
    let items = [];
    for (var i = this.props.items.length - 1; i >= 0; i--) {
      items.push(
        <Col sm={12} md={8} style={gridItem}>
          <h3 style={gridText}>{this.props.items[i].title}</h3>
          <img style={imgStyle} src={this.props.items[i].url} />
          <div style={{width: "70%", margin: "0 auto"}}>
          <p style={{margin: 10}}>{this.props.items[i].description}</p>
          </div>
          <hr style={{margin: 0}}/>
          <div style={{width: "70%", margin: "0 auto"}}>
            <p style={{textAlign: "left", display: "inline-block", width: "50%", margin: "10px 0"}}>by <a href="#">{this.props.items[i].author}</a></p>
            <p style={{textAlign: "right", display: "inline-block", width: "50%", margin: "10px 0"}}>{this.props.items[i].createdAt}</p>
          </div>
        </Col>);
    }
    return items;
  }

  render() {
    return(
      <Grid>
        <Row className="show-grid">
          {this.Item()}
        </Row>
      </Grid>
    );
  }
}

class NAVBAR extends Component {
 render(){
   return(
     <Navbar inverse fixedTop >
       <Grid style={{color: "#fff"}}>
         <Row className="show-grid">
           <Col xs={4} sm={4} md={4}>
             <Nav pullLeft>
               <FontAwesomeIcon href="#brand" icon={faCamera} style={{"fontSize" : "20px", "textAlign" : "left"}} />
             </Nav>
           </Col>
           <Col xs={4} sm={4} md={4}>
             <p style={{"fontSize" : "20px"}}>InstaClone</p>
           </Col>
         </Row>
       </Grid>
     </Navbar>
   );
  }
}

export default App;
