import React, { useState, useEffect } from 'react'
import styles from './ListItem.module.css'
import { useNavigate } from 'react-router-dom'

const markers = new Array();

const ListItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const [tourItems, setTourItems] = useState([]);
  const navigate = useNavigate();
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchTourItems = async () => {
      try {
        const response = await fetch(`https://wsuarboretumnodeapi.onrender.com/root/getTour?id=${item.themeId}`);
        const data = await response.json();
        setTourItems(data);
      } catch (error) {
        console.error('Error fetching tour items:', error);
      }
    };

    fetchTourItems();
  }, []);

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
    return new Location(lat, long, name);
  }

  const loadMap = () => {
    while(markers.length) markers.pop();
    tourItems.forEach(function(x) {
      const geoLocation = parse_geolocation(x.geoLocation, x.displayName);
      const marker = {
        position: {lat: parseFloat(geoLocation.lat), lng: parseFloat(geoLocation.long)},
        label: geoLocation.name,
      };
      markers.push(marker);
    });
    sessionStorage.setItem('markers', JSON.stringify(markers));
    console.log(markers);
    navigate('/map');
  }

  const seeItems = () => {
    console.log(tourItems)
  }

  const url = new URL(`https://wsuarboretumnodeapi.onrender.com/root/getTour?id=${item.themeId}`);

  return (
    <li className={`${styles.listItem} ${expanded ? styles.expandedListItem : ''}`} onClick={toggleExpanded}>
      <div className={styles.leftSection}>
        <span className={`${styles.tourName} ${expanded ? styles.hidden : ''}`}>
          {item.themeName}
        </span>
        <ul className={styles.nodes}>
          {expanded && (
            <>
              <li>{tourItems[0].displayName}</li>
              <li>{tourItems[1].displayName}</li>
              <li>{tourItems[2].displayName}</li>
              <li>{tourItems[3].displayName}</li>
            </>
          )}
        </ul>
      </div>
      {expanded && (
        <div className={styles.centerSection}>
          <p className={styles.description}>
            {item.description.length > 100 ? item.description.substring(0,100).trim()+'...' : item.description}
          </p>
        </div>
      )}
      {expanded && (
        <div className={styles.rightSection}>
          <span className={`${styles.caret} material-icons`}>chevron_left</span>
          <button className={styles.button} onClick={loadMap}>View Map</button>
          <button className={styles.button} onClick={seeItems}><a /*href={url.href}*/ className={styles.noDecoration}>Take Tour</a></button>
        </div>
      )}
      {!expanded && (
        <span className={`${styles.caret} material-icons`}>expand_more</span>
      )}
    </li>
  );
};

export default ListItem;
