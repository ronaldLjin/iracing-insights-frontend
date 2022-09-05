import React, { useState, useEffect } from 'react'
import './styles/style.css';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PercentileCalculator from './PercentileCalculator';
import Home from './Home'
import DriverStats from './DriverStats';
import Leaderboard from './Leaderboard';
import DriverSearch from './DriverSearch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/iracing-insights-frontend/" element={<Home />} />
        <Route path="/iracing-insights-frontend/percentile-calculator" element={<PercentileCalculator />} />
        <Route path="/iracing-insights-frontend/percentile-calculator" element={<PercentileCalculator />} />
        <Route path="/iracing-insights-frontend/driver-stats/:clientId" element={<DriverStats />} />
        <Route path="/iracing-insights-frontend/leaderboard/:pageNumber" element={<Leaderboard />} />
        <Route path="/iracing-insights-frontend/driver-search/:searchTerm" element={<DriverSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
