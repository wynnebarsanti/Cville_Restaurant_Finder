import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home.js'

class App extends React.Component {

  render(){
    return(
      <div className="App">
        <header style={{color: 'blue'}}>
          <b>Charlottesville Restaurant Finder!</b>
          </header>
        <Home />
      </div>
    )
  }
}

export default App;
