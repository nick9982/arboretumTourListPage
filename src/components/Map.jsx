import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import React, { useState, useEffect } from 'react'
import styles from '../index.css?inline'

const fetchTourItems = async () => {
  try {
    const id = new URLSearchParams(location.search).get('tour_id');
    const response = await fetch(`https://wsuarboretumnodeapi.onrender.com/root/getTour?id=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tour items:', error);
  }
}

export default function MapLoader(){
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: key,
    });

    if(!isLoaded) return <div>Loading...</div>;
    return <Map />;
}
class Location{
  constructor(lat, long, name){
    this.lat = lat;
    this.long = long;
    this.name = name;
  }
}
const parse_geolocation = (geoLocation, name) => {
  let lat, long;
  let part_cnt = 0;
  for(let i = 1; i < geoLocation.length; i++){
    if(geoLocation.charAt(i) == '"' && geoLocation.charAt(i-1) == ':'){
      let x = i+1;
      while(x < geoLocation.length){
        if(geoLocation.charAt(x) == '"'){
          if(part_cnt == 0)
            lat = geoLocation.substring(i+1, x);
          else{
            long = geoLocation.substring(i+1, x);
            break;
          }
          part_cnt++;
        }
        x++;
      }
    }
  }
  return new Location(parseFloat(lat), parseFloat(long), name);
}
function LoadMarkers(map){
  let MoreThanZero = false;
  fetchTourItems()
  .then((tourItems) => {
    const bounds = new window.google.maps.LatLngBounds();
    tourItems.forEach(function(x) {
      const geoLocation = parse_geolocation(x.geoLocation, x.displayName);
      var marker = new google.maps.Marker({
        position:{lat:geoLocation.lat, lng: geoLocation.long},
        title:geoLocation.name
      });
      if(isNaN(geoLocation.lat) || isNaN(geoLocation.long)) return;
      if(geoLocation.lat > 44.05 || geoLocation.lat < 44.04 || 
      geoLocation.long < -91.65 || geoLocation.long > -91.64) return;
      bounds.extend(marker.position);
      marker.setMap(map);
      MoreThanZero = true;
    })
    if(MoreThanZero) map && map.fitBounds(bounds);
  })
}
function Map(){
  return (<GoogleMap zoom={18}
  mapContainerClassName="map-container"
  center = {{lat:44.047318,lng:-91.644497}}
  onLoad={x => LoadMarkers(x)}
  mapTypeId="satellite">
  </GoogleMap>)
}