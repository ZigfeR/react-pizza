import React from 'react';

import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Short from './components/Short';

import pizza from './assets/pizza.json';

import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <div className="content">
        <Header />
        <div className="container">
          <div className="content__top">
            <Categories />
            <Short />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizza.map((obj) => (
              <PizzaBlock
                title={obj.title}
                price={obj.price}
                image={obj.imageUrl}
                sizes={obj.sizes}
                types={obj.types}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
