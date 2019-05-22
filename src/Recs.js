import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import MakeMap from './MakeMap';

const API_KEY = process.env.REACT_APP_API_KEY

class Recs extends React.Component{

    state ={
        data:[]
    }


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
            <h2>Recommendations in Charlottesville:</h2>

            <div className="content">

                <div className="list">
                    {this.displayResults()}
                </div>

                {this.state.data.length!==0 ? <MakeMap restaurants={this.state.data} /> : <div></div>}

            </div>
        </div>   
    )
}

// cville: 38.0293° N, 78.4767° W

componentDidMount(){
    //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY
    let base = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.0293,-78.4767"
    let keyword = "&keyword=" + this.props.keyword;
    let link = base + "&radius=4000"+ "&type=restaurant&opennow"  + keyword + "&key=" + API_KEY;
    console.log(link)
    axios.get(link).then(
        (res)=>{
            console.log(res);
            let data = res.data.results;
            let maxprice = this.state.price;
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
