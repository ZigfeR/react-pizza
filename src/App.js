import React from 'react';

import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Short from './components/Short';

import './scss/app.scss';

function App() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch('https://64074338862956433e6a09d1.mockapi.io/items')
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
      });
  }, []);

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
            {items.map((obj) => (
              <PizzaBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
