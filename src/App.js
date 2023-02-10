import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coins from './components/Coins';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Coin from './routes/Coin';

function App() {

  const [coins, setCoins] = useState([]);
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`;

  useEffect(() => {
    axios.get(url).
      then((response) => {
        setCoins(response.data)
      }).catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <HelmetProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Coins coins={coins} />} />
        <Route path='/coin' element={<Coin />}>
          <Route path=':coinId' element={<Coin />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
