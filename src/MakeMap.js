import React from 'react';
import L from 'leaflet';
//import './leaflet/dist/leaflet.css';
import styled from 'styled-components';
import axios from 'axios';


const Wrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
`;

class MakeMap extends React.Component{

    componentDidMount(){
        this.map = L.map("map",{
            center:[38.0293, -78.4767],
            zoom: 13,
            zoomControl: false
        });

       let url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
       let access_token = 'pk.eyJ1Ijoid3lubmViYXJzYW50aSIsImEiOiJjanZ5Nnh0cHkwY3JjNDhwY3hxZnY5NTIzIn0.TM8fVggjHFXeRe4md2GOaw' 
       
       L.tileLayer( url , {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: access_token
        }).addTo(this.map);

        let restaurants = this.props.restaurants;
                
        for (let i = 0; i < restaurants.length; i++){
            let marker = L.marker([restaurants[i].lat, restaurants[i].long]).addTo(this.map);
            marker.bindPopup(`<b>${restaurants[i].name}</b><br>${restaurants[i].address}`);
        }
        
        
    }

    render(){
        return <Wrapper width="50%" height="500px" id='map' />
    }

}
export default MakeMap;