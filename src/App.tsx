import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Join from './pages/Join';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/EnterInfo" element={<Join name={'임하나'} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
