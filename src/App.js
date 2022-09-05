import React, { useState, useEffect } from 'react'
import './styles/style.css';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import PercentileCalculator from './PercentileCalculator';
import Home from './Home'
import DriverStats from './DriverStats';
import Leaderboard from './Leaderboard';
import DriverSearch from './DriverSearch';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/percentile-calculator" element={<PercentileCalculator />} />
        <Route path="/percentile-calculator" element={<PercentileCalculator />} />
        <Route path="/driver-stats/:clientId" element={<DriverStats />} />
        <Route path="/leaderboard/:pageNumber" element={<Leaderboard />} />
        <Route path="/driver-search/:searchTerm" element={<DriverSearch />} />
      </Routes>
  );
}

export default App;
