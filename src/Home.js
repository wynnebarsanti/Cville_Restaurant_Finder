import React from 'react';
import logo from './logo.svg';
import './App.css';
import Recs from './Recs.js';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY

class Home extends React.Component{
    
    state = {
        searching: false,
        keyword: "",
        houseNumber: "",
        street: "",
        streetType: "",
        city: "",
        state: "",
        latitude: "",
        longitude: ""
    }

// these functions update state values based on user input
changeKeyword=(input)=>{
    this.setState({
        keyword: input
    })
}

changeHouseNumber=(input)=>{
    this.setState({
        houseNumber: input
    })
}
changeStreet=(input)=>{
    this.setState({
        street: input
    })
}
changeStreetType=(input)=>{
    this.setState({
        streetType: input
    })
}

changeCity=(input)=>{
    this.setState({
        city: input
    })
}

changeState=(input)=>{
    this.setState({
        state: input
    })
}

// when the search button is clicked, get the location data
searchClicked = () => {
    // if there is no user input for location, effectively do nothing
    if (this.state.houseNumber=="" && this.state.street=="" && this.state.streetType=="" && 
            this.state.city=="" && this.state.state=="" ){
                return (
                    // To improve, make this an alert!
                    console.log("No User Input")
                )
            }
    // if this is not the first search, set searching to false initially to rerender Recs component
    if (this.state.searching){
        this.setState({
            searching: false
        }, this.getLatLong())
    }
    // if searching is false, this is the first search, so just run getLatLong()
    else {
        this.getLatLong()
    }
    
}

// converts the given address and sets the latitude and longitude in state
getLatLong=()=>{
    // build the API request link based on state variables
    let base = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    let address = this.state.houseNumber + "+" + this.state.street + "+" + this.state.streetType + ",+" + this.state.city + ",+" + this.state.state;
    let url = base + address + "&key=" + API_KEY;
    let lat = "";
    let long = "";

    // make the API call
    axios.get(url).then(           
        (res) => {
            // get the latitude and longitude values for the given address
            lat = res.data.results[0].geometry.location.lat;
            long = res.data.results[0].geometry.location.lng;

            // set these values in state
            this.setState({
                latitude: lat, 
                longitude: long,
                searching: true, // this changes the state and allows Recs component to be called
            })
        }
    )
}

// when reset button is clicked, clear all fields
resetClicked=()=> {
    this.setState({
        searching: false,
        keyword: "",
        houseNumber: "",
        street: "",
        streetType: "",
        city: "",
        state: "",
        latitude: "",
        longitude: ""
    })
}


render(){  
    return(
        <div className="App">
        <h1>
        <form>
            <TextField 
                placeholder="e.g. American"  
                label="Cuisine Type"
                id="standard-dense"
                onChange={
                    (e)=>{this.changeKeyword(e.target.value)} }/>
            
            <div>
                <TextField 
                    required 
                    id="standard-required"
                    label="House Number"
                    placeholder="e.g. 1024" 
                    onChange={
                        (e)=>{this.changeHouseNumber(e.target.value)} }/>
                <TextField 
                    required 
                    id="standard-required"
                    label="Street Name"
                    placeholder="e.g. Main" 
                    onChange={
                        (e)=>{this.changeStreet(e.target.value)} }/>
                 <TextField 
                    required 
                    id="standard-required"
                    label="Street Type"
                    placeholder="e.g. Rd/Ln/St" 
                    onChange={
                        (e)=>{this.changeStreetType(e.target.value)} }/>  
                <TextField 
                    required 
                    id="standard-required"
                    placeholder="e.g. Charlottesville" 
                    label="City"
                    onChange={
                        (e)=>{this.changeCity(e.target.value)} }/>
                <TextField 
                    required 
                    id="standard-required"
                    label="State"
                    placeholder="e.g. VA" 
                    onChange={
                        (e)=>{this.changeState(e.target.value)} }/>
                                  
            </div>

            <Button variant="contained" color="primary" onClick= {this.searchClicked}>Search</Button>

            <Button type="reset" variant="contained" color="primary" onClick={this.resetClicked}>Reset</Button>
        </form>
        </h1>

        {this.state.searching? 
            <Recs keyword={this.state.keyword} 
                lat={this.state.latitude} 
                long={this.state.longitude} 
                city={this.state.city} 
                /> 
                : null}
        </div>
        )
    }
}
export default Home;
