import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <div className="content">
        <Header />
        <div className="container">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
