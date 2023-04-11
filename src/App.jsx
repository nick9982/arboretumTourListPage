import React from 'react';
import Header from './components/Header';
import Map from './Map';
import ToursList from './components/ToursList';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';


function App() {
  return (
    <Routes>
      <Route path='/' element={ <Layout /> }>
        <Route index element={ <ToursList />}></Route>

        <Route path='map'>
          <Route path=':id' element={ <Map /> }></Route>
        </Route>
        
      </Route>
    </Routes>
  );
}

export default App
