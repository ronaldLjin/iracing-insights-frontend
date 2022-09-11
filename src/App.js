import React, { useState, useEffect } from 'react'
import './styles/style.css';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import PercentileCalculator from './PercentileCalculator';
import Home from './Home'
import DriverStats from './DriverStats';
import Leaderboard from './Leaderboard';
import DriverSearch from './DriverSearch';
import PageNotFound from './PageNotFound';

function App() {
  return (
    <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/percentile-calculator" exact element={<PercentileCalculator />} />
        <Route path="/driver-stats/:clientId" exact element={<DriverStats />} />
        <Route path="/leaderboard/:category/:pageNumber" exact element={<Leaderboard />} />
        <Route path="/driver-search/:searchTerm" exact element={<DriverSearch />} />
        <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
