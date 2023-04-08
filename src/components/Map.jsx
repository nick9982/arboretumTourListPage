import React from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import styles from '../index.css?inline'

const markers = JSON.parse(sessionStorage.getItem('markers'));

console.log(markers.length);
console.log("loaded?");
console.log(markers);

export default function MapLoader(){
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDX7Tc93ekLzvq-vAf-1UnA2ic87KzgsYg",
    });

    if(!isLoaded) return <div>Loading...</div>;
    return <Map />;
}

function Map(){
  if(markers == null){
    return <GoogleMap zoom={18}
    center={markers[0].position} 
    mapContainerClassName="map-container">
    <Marker key={2} lat={44.04858} lng={-91.64296} zIndex={999} />
    </GoogleMap>
  }
    return <GoogleMap zoom={18}
    center={markers[0].position} 
    mapContainerClassName="map-container">
        <Marker key={2} lat={44.04858} lng={-91.64296} zIndex={999} />
    </GoogleMap>
}
/*{markers.map((marker) => {
    <Marker key={marker.label} position={marker.position} label={marker.label}></Marker>
})}*/