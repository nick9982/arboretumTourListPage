import { React, useState } from 'react'
import { Marker, InfoWindow } from '@react-google-maps/api';

const TreeMarker = ({ tree }) => {
    const [visible, setVisible] = useState(false)
    const func = () => {
        console.log('TreeMarker')
        setVisible(!visible)
    }
    let arr =  tree.geoLocation.split('"');
    var pos = {lat: parseFloat(arr[3]), lng: parseFloat(arr[7])}
  return (
    <>
        <Marker
        position={pos}
        onClick={() => setVisible(!visible)}
        />
        {visible &&
        <InfoWindow
        position={pos}
        >
            <div><h1 style={{color: 'black'}}>{tree.displayName}</h1></div>
        </InfoWindow>
        }
    </>
    
  )
}

export default TreeMarker