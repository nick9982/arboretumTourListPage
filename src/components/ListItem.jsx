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

  const toMap = () => {
    navigate('/map?tour_id='+item.themeId);
  }

  const seeItems = () => {
    console.log(tourItems)
  }

  const url = new URL(`https://wsuarboretumnodeapi.onrender.com/root/getTour?id=${item.themeId}`);

  return (
    <li className={`${styles.listItem} ${expanded ? styles.expandedListItem : ''}`} onClick={toggleExpanded}>
      
      {expanded &&
          <div className={styles.itemHeader}>
            <span className={`${styles.tourName} ${expanded ? styles.hidden : ''}`}>
              {item.themeId == 1 && 
              <img src="./src/assets/Pinetree.png" className={styles.listItemImg}></img>}
              {item.themeId == 3 && 
              <img src="./src/assets/FlowerRed.png" className={styles.listItemImg}></img>}
              {item.themeId == 4 && 
              <img src="./src/assets/Grass.png" className={styles.listItemImg}></img>}
              {item.themeId == 5 && 
              <img src="./src/assets/Mushroom.png" className={styles.listItemImg}></img>}
              {item.themeId == 6 && 
              <img src="./src/assets/Cross.png" className={styles.listItemImg}></img>}
              {item.themeId == 18 && 
              <img src="./src/assets/Quill.png" className={styles.listItemImg}></img>}
              {item.themeId == 19 && 
              <img src="./src/assets/Butterfly.png" className={styles.listItemImg}></img>}
              {item.themeId == 20 && 
              <img src="./src/assets/Bird.png" className={styles.listItemImg}></img>}
              {item.themeId == 24 && 
              <img src="./src/assets/FlowerCyan.png" className={styles.listItemImg}></img>}
              {item.themeId == 26 && 
              <img src="./src/assets/FlowerGreen.png" className={styles.listItemImg}></img>}
              {item.themeId == 27 && 
              <img src="./src/assets/Pinetree.png" className={styles.listItemImg}></img>}
              {item.themeId == 28 && 
              <img src="./src/assets/FlowerPurple.png" className={styles.listItemImg}></img>}
              {item.themeId == 29 && 
              <img src="./src/assets/FlowerRed.png" className={styles.listItemImg}></img>}
              {item.themeId == 30 && 
              <img src="./src/assets/FlowerPink.png" className={styles.listItemImg}></img>}
              {item.themeId == 34 && 
              <img src="./src/assets/Pinetree.png" className={styles.listItemImg}></img>}
              &nbsp;{item.themeName}
            </span>
            <span className={`${styles.caret} material-icons`}>chevron_left</span>
          </div>
      }
      {!expanded &&
        <div className={styles.itemHeader}>
          <span className={`${styles.tourName} ${expanded ? styles.hidden : ''}`}>
            {item.themeId == 1 && 
            <img src="./src/assets/Pinetree.png" className={styles.listItemImg}></img>}
            {item.themeId == 3 && 
            <img src="./src/assets/FlowerRed.png" className={styles.listItemImg}></img>}
            {item.themeId == 4 && 
            <img src="./src/assets/Grass.png" className={styles.listItemImg}></img>}
            {item.themeId == 5 && 
            <img src="./src/assets/Mushroom.png" className={styles.listItemImg}></img>}
            {item.themeId == 6 && 
            <img src="./src/assets/Cross.png" className={styles.listItemImg}></img>}
            {item.themeId == 18 && 
            <img src="./src/assets/Quill.png" className={styles.listItemImg}></img>}
            {item.themeId == 19 && 
            <img src="./src/assets/Butterfly.png" className={styles.listItemImg}></img>}
            {item.themeId == 20 && 
            <img src="./src/assets/Bird.png" className={styles.listItemImg}></img>}
            {item.themeId == 24 && 
            <img src="./src/assets/FlowerCyan.png" className={styles.listItemImg}></img>}
            {item.themeId == 26 && 
            <img src="./src/assets/FlowerGreen.png" className={styles.listItemImg}></img>}
            {item.themeId == 27 && 
            <img src="./src/assets/Pinetree.png" className={styles.listItemImg}></img>}
            {item.themeId == 28 && 
            <img src="./src/assets/FlowerPurple.png" className={styles.listItemImg}></img>}
            {item.themeId == 29 && 
            <img src="./src/assets/FlowerRed.png" className={styles.listItemImg}></img>}
            {item.themeId == 30 && 
            <img src="./src/assets/FlowerPink.png" className={styles.listItemImg}></img>}
            {item.themeId == 34 && 
            <img src="./src/assets/Pinetree.png" className={styles.listItemImg}></img>}
            &nbsp;{item.themeName}
          </span>
          <span className={`${styles.caret} material-icons`}>expand_more</span>
        </div>
      }
      {expanded &&
        (<div className={styles.leftSection}>
        <ul className={styles.nodes}>

            <>
              <li>{tourItems[0].displayName}</li>
              <li>{tourItems[1].displayName}</li>
              <li>{tourItems[2].displayName}</li>
              <li>{tourItems[3].displayName}</li>
            </>
        </ul>
      </div>
      )}
      {expanded && (
        <div className={styles.centerSection}>
          <p className={styles.description}>
            {item.description.length > 100 ? item.description.substring(0,100).trim()+'...' : item.description}
          </p>
        </div>
      )}
      {expanded && (
        <div className={styles.rightSection}>
          <button className={styles.button} onClick={toMap}>View Map</button>
          <button className={styles.button} onClick={seeItems}><a className={styles.noDecoration}>Take Tour</a></button>
        </div>
      )}
    </li>
  );
};

export default ListItem;
