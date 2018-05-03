import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Rank from './components/rank/Rank';
import SignIn from './components/signin/SignIn';
import Register from './components/register/Register';
import ImageURL from './components/imageURL/ImageURL';
import FaceDetector from './components/faceDetector/FaceDetector';

import './App.css';
import Particles from 'react-particles-js';

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageURL: '',
  facebox: {},
  currentPage: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      facebox: {},
      currentPage: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
      }
    })
  }

  // componentDidMount() {
  //   // this fails on chrome so we need to set CORS server-side
  //   fetch("http://localhost:3000/")
  //   .then(res => res.json())
  //   .then(data => console.log(data))
  // }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('imageInput');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (boxValue) => {
    this.setState({facebox:boxValue})
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () => {
    
    const dot = this.state.input.indexOf(".", this.state.input.length-5);
    const target = this.state.input.substring(dot);
    const extension = ['.jpg','.jpeg','.png'];
    this.setState({imageURL:this.state.input})

    if (extension.includes(target)) {
      fetch("https://enigmatic-beyond-88425.herokuapp.com/imageurl", {
        method: "post",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("https://enigmatic-beyond-88425.herokuapp.com/image", {
            method: "put",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
          }).catch(err => console.log(err))
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err))
    } else {
      console.log('nah');
    }

  }

  onPageChange = (page) => {
    if (page === 'home'){
      this.setState({isSignedIn: true})
    } else if (page === 'signin'){
      this.setState(initialState)
    }
    this.setState({currentPage: page});
  }

  render() {
    const { isSignedIn, currentPage, imageURL, facebox, user } = this.state
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Navigation isSignedIn={isSignedIn} onPageChange={this.onPageChange}/>
        { currentPage === 'signin' ?
        <div>
          <SignIn loadUser={this.loadUser} onPageChange={this.onPageChange} />
        </div>
        : this.state.currentPage === 'home' ?
        <div>
          <Rank name={user.name} entries={user.entries}/>
          <ImageURL onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceDetector imageURL={imageURL} box={facebox}/>
        </div>
        : <div>
          <Register loadUser={this.loadUser} onPageChange={this.onPageChange} />
        </div>
      }
      </div>
    );
  }
}

export default App;
