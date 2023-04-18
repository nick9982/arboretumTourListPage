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
          <button className={styles.button} onClick={toMap}>View Map</button>
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
