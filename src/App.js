import React from 'react';

import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Short from './components/Short';

import './scss/app.scss';

function App() {
  return (
    <div class="wrapper">
      <div class="content">
        <Header />
        <div class="container">
          <div class="content__top">
            <Categories />
            <Short />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            <PizzaBlock title="Итальянская" price={390} />
            <PizzaBlock title="Кубинская" price={420} />
            <PizzaBlock title="Ирландская" price={470} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
