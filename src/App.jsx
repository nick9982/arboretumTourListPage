import React from 'react';
import Header from './components/Header';
import ToursList from './components/ToursList';
import MapLoader from './components/Map';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function TourList() {
  return (
    <div className="App">
      <Header />
      <ToursList />
    </div>
  );
}

function MapPage(){
  return (
    <div className="MapCont">
      <MapLoader />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TourList />}></Route>
        <Route path="/map" element={<MapPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
