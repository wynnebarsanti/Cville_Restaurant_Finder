import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home.js'

class App extends React.Component {

  render(){
    return(
      <body>
          <h1>
          Charlottesville Restaurant Finder!
          </h1>
        <Home />
      </body>
    )
  }
}

export default App;
