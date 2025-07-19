import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Landing from './components/landing';

function App() {
  return (
    <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Landing/>} />
          </Routes>
        </div>
      </Router>
  )
}

export default App
