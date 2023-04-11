import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const Map = () => {
  const [tourItems, setTourItems] = useState([]);

  const { id } = useParams();

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

  return (
    <div>Map // {id}</div>
  )
}

export default Map