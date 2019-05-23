import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import MakeMap from './MakeMap';
import Button from '@material-ui/core/Button';

const API_KEY = process.env.REACT_APP_API_KEY

class Recs extends React.Component{

    state ={
        link:"",
        lat: "",
        long: "",
        data:[]
    }

// sorts the restaurant data by price, low to high
sortByPrice=()=>{
    let allRestaurants = this.state.data;
    allRestaurants.sort(function(a, b){
        return a.price >= b.price ? 1 : -1;
    })
    this.setState({
        data: allRestaurants
    })
}

// sorts restaurant data by rating, high to low
sortByRating=()=>{
    let allRestaurants = this.state.data;
    allRestaurants.sort(function(a, b){
        return a.rating >= b.rating ? -1 : 1;
    })
    this.setState({
        data: allRestaurants
    })
}

// this method displays the list of restaurants found 
displayResults=()=>{
    let foundRestaurants = this.state.data;
    return foundRestaurants.map(
        (r) => {
            return (
            <div className="listitem">
                <b>{r.name}</b> 
                (Price: {r.price}) -- {r.rating} stars
                <div className="address">{r.address}</div>
            </div>
            )
        }
    )
}

render(){
    return(
        <div>
            <h2>Recommendations in {this.props.city}</h2>
            <div className="content">
        
                <div className="list">
                <Button onClick={this.sortByPrice} color="primary" variant="contained">sort by price</Button>
                <Button onClick={this.sortByRating} color="primary" variant="contained">sort by rating</Button>

                {this.displayResults()}
                
                </div>

                {this.state.data.length!==0 ? <MakeMap restaurants={this.state.data} lat={this.state.lat} long={this.state.long} /> : <div></div>}

            </div>

        </div>   
    )
}


componentDidMount(){
    // build api call link based on latitude, longitude, and keyword from user input
    let base = "https://cors-anywhere-hclaunch.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?" //location=38.0293,-78.4767"
    let location= "location=" + this.props.lat + "," + this.props.long;
    let keyword = "&keyword=" + this.props.keyword;
    let link = base + location + "&radius=4000"+ "&type=restaurant&opennow"  + keyword + "&key=" + API_KEY;
    
    // get the list of restaurants from google API
    axios.get(link).then(
        (res)=>{
            console.log(res);
            let data = res.data.results;
            let foundRestaurants = [];
            for (let i = 0; i < data.length; i++){
                // create a restaurant object with relevant information
                let restaurant = { 
                    name: data[i].name, 
                    price: data[i].price_level,
                    rating: data[i].rating,
                    address: data[i].vicinity,
                    open: data[i].opening_hours.open_now,
                    lat: data[i].geometry.location.lat,
                    long: data[i].geometry.location.lng
                }
                // add 
                foundRestaurants.push(restaurant);
            }

            this.setState({
                data: foundRestaurants,
                lat: this.props.lat,
                long: this.props.long,
            })
        }
    )
}
}

export default Recs;
