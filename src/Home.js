import React from 'react';
import logo from './logo.svg';
import './App.css';
import Recs from './Recs.js';



class Home extends React.Component{
    
    state = {
        searching: false,
        keyword: "",
        price: 0,
        rating: 0,
    }


changeKeyword=(input)=>{
    this.setState({
        keyword: input
    })
}

changePrice=(input)=>{
    this.setState({
        price: input
    })
}

changeRating=(input)=>{
    this.setState({
        rating: input
    })
}

searchClicked = () => {
    this.setState({
        searching: true
    })
}

resetClicked=()=> {
    this.setState({
        keyword: "",
        searching: false
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
        
        
            <input placeholder="Cuisine Type" onChange={
                (e)=>{this.changeKeyword(e.target.value)} }/>
            
            <input placeholder="Max Price (1-3)" onChange={
                (e)=>{this.changePrice(e.target.value)} }/>

            <input placeholder="Min Rating (0-5)" onChange={
                (e)=>{this.changeRating(e.target.value)} }/>

            <button onClick= {this.searchClicked}>Search</button>

            <button onClick={this.resetClicked}>Reset</button>


        {this.state.searching ? <Recs keyword={this.state.keyword} price={this.state.price}/> : null}

        </div>
        
    )
}
}

export default Home;
