import React, { Component } from 'react';
// import logo from './logo.svg';
import img from './img.jpg';
import './App.css';


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

console.log(userPost[0]);


class App extends Component {

  state = {
    selectedFile : null
  }

  fileSelectedHandler = event => {
    this.setState({
      selectedFile : event.target.files[0]
    })
  }

  fileUploadHandler = () => {

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <input type="file" id="file" onChange={this.fileSelectedHandler}/>
         <label for="fileupload"> Select a file to upload</label>
         <input type="submit" value="submit" onClick={this.fileSelectedHandler} />
          <p>{userPost[0].title}</p>
          <img src={userPost[0].img} style={imgStyle} />
          <p>{userPost[0].user}</p>
        </header>
      </div>
    );
  }
}

export default App;
