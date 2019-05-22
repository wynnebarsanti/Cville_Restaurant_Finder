import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
//import MakeMap from './MakeMap.js';
import MakeMap from './MakeMap';

const API_KEY = process.env.REACT_APP_API_KEY
const change = "i am making a change";

class Recs extends React.Component{

    state ={
        data:[]
    }

displayResults=()=>{
    let foundRestaurants = this.state.data
    return foundRestaurants.map(
        (r) => {
            return <li align="left">
                <b>{r.name}</b> (Price: {r.price}) -- {r.rating} stars -- {r.address}
            </li>
        }
    )
}
/*
convertZipcode=()=>{
    let zip = this.state.zipcode;
    return "123,123"
}
*/

render(){
    return(
        <div className="App">
            <header>Recommendations in Charlottesville:</header>
            {this.state.data.length!==0 ? <MakeMap restaurants={this.state.data} /> : <div></div>}
            {this.displayResults()}
        </div>
    )
}

// cville: 38.0293° N, 78.4767° W

componentDidMount(){
    //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY
    let base = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.0293,-78.4767"
    //let coordinates = this.convertZipcode;
    //let rad = this.state.radius;
    //let rad = this.props.radius * 1609.344;
    let link = base + "&radius=1500" /*+ rad*/ + "&type=restaurant&opennow" /* + &keyword=xxxxx */ + "&key=" + API_KEY;

    axios.get(link).then(
        (res)=>{

            let data = res.data.results;
            let foundRestaurants = [];
            for (let i = 0; i < data.length; i++){

                let restaurant = { 
                    name: data[i].name, 
                    price: data[i].price_level,
                    rating: data[i].rating,
                    address: data[i].vicinity,
                    open: data[i].opening_hours.open_now,
                    lat: data[i].geometry.location.lat,
                    long: data[i].geometry.location.lng
                }

                foundRestaurants.push(restaurant);

            }

            this.setState({
                data: foundRestaurants
            })
        }
    )
}

}

export default Recs;
