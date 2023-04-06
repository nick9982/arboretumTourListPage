// src/components/List.jsx
import React, { useState, useEffect } from 'react';
import ListItem from './ListItem';
import SearchItem from './SearchItem';
import styles from './ToursList.module.css';

const ToursList = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('https://wsuarboretumnodeapi.onrender.com/root/getTours');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    };

    fetchTours();
  }, []);

  const filteredItems = items.filter(item =>
    item.themeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className={styles.listTitle}>Tour Selection</h2>
      <SearchItem onSearch={setSearchTerm} />
      {filteredItems.length > 0 ? (
        <ul>
          {filteredItems.map((item, index) => (
            <ListItem key={index} item={item} />
          ))}
        </ul>
      ) : (
        <p className={styles.loading}>Loading items...</p>
      )}
    </div>
  );
};

export default ToursList;
