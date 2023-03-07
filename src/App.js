import React from 'react';

import Header from './components/Header';
import { Home } from './pages/Home';

import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <div className="content">
        <Header />
        <div className="container">
          <Home />
        </div>
      </div>
    </div>
  );
}

export default App;
