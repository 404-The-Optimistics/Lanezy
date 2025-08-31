import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Landing from './components/landing';
import Dashboard from './components/Dashboard';
import Team from './components/team';
import MapPage from './components/map';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  return (
    <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/team" element={<Team/>} />
            <Route path="/map" element={<MapPage/>} />
          </Routes>
        </div>
      </Router>
  )
}

export default App