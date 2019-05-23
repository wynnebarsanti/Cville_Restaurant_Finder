import React from 'react';
import L from 'leaflet';
import styled from 'styled-components';

// This sets up a wrapper for the map
const Wrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
`;


class MakeMap extends React.Component{
    
    componentDidMount(){
        // create the map
        this.map = L.map("map",{
            center:[this.props.lat, this.props.long],
            zoom: 12,
            zoomControl: true
        });

        // build the URL to access the tile layer
       let url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
       let access_token = 'pk.eyJ1Ijoid3lubmViYXJzYW50aSIsImEiOiJjanZ5Nnh0cHkwY3JjNDhwY3hxZnY5NTIzIn0.TM8fVggjHFXeRe4md2GOaw' 
       
       L.tileLayer( url , {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: access_token
        }).addTo(this.map);

        // access the list of restaurants from props
        let restaurants = this.props.restaurants;
                
        // add a marker to the map for every restaurant in our list
        for (let i = 0; i < restaurants.length; i++){
            let marker = L.marker([restaurants[i].lat, restaurants[i].long]).addTo(this.map);
            marker.bindPopup(`<b>${restaurants[i].name}</b><br>${restaurants[i].address}`);
        }   
    }

    render(){
        // make the map!
        return <Wrapper width="50%" height="500px" id='map' />
    }
}
export default MakeMap;