import React from 'react';
import logo from './logo.svg';
import './App.css';
import Recs from './Recs.js';


class Home extends React.Component{
    state = {
        zipcode: 0,
        radius: 0,
        searching: false,
        reset: false
    }

changeZipcode=(input)=>{
    this.setState({
        zipcode:input
    })
}

changeRadius=(input)=>{
    this.setState({
        radius: input
    })
}

searchClicked = () => {
    this.setState({
        searching: true
    })
}

resetClicked=()=> {
    this.setState({
        reset: true
    })
}


render(){
    /* no zipcode button
    <div>
            Enter Zipcode:
          <input onChange={
            (e)=>{this.changeZipcode(e.target.value)} }/>
        </div>

        <div>
            Enter Radius (miles):
            <input onChange={
                (e)=>{this.changeRadius(e.target.value)} }/>
        </div>
    */
    return(
        <div className="App">


        <button onClick={this.searchClicked}>Search</button>
        {this.state.searching ? <Recs /*radius={this.state.radius}*//> : null}

        <button onClick={this.resetClicked}>Reset</button>
        {this.state.reset ? <Home/> : null}
        </div>
    )
}

}

export default Home;
