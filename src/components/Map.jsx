import { React, useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import TreeMarker from './TreeMarker';


const containerStyle = {
  width: '100%',
  height: '100rem',
  zIndex: 500
};

const center = {
  lat: 44.04774250493648,
  lng: -91.64367260119033
};


const Map = ({ location, setLocation }) => {
  const [tourItems, setTourItems] = useState([]);

  var posi = {
  lat: 44.048580,
  lng: -91.642960
  };

  const { id } = useParams();
  const KEY = import.meta.env.API_URL || 'AIzaSyBjNHV4oJOFCkdYJhdgKU-FjYm7CgDQHko';

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: KEY,
  })

  const [map, setMap] = useState(null);
  let zoom = 17.5;

  const onLoad = useCallback(function callback(map) {
    map.setZoom(zoom)
    
    console.log('Your location')
    console.log(location)
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  useEffect(() => {
    const fetchTourItems = async () => {
      try {
        const response = await fetch(`https://wsuarboretumnodeapi.onrender.com/root/getTour?id=${id}`);
        const data = await response.json();
        setTourItems(data);
      } catch (error) {
        console.error('Error fetching tour items:', error);
      }
    };

    fetchTourItems();
  }, []);



  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      {tourItems.map((item, index) => (
        <TreeMarker tree={item} key={index}></TreeMarker>
      ))}
      <Marker 
      position={location} 
      label={'You Are Here'} 
      zIndex={30}></Marker>
    </GoogleMap>
) : <></>
}

export default Map