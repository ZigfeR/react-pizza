import React from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Short from '../components/Short';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setTypeSort] = React.useState({ name: 'популярности', sortProperty: 'rating' });

  React.useEffect(() => {
    setLoading(true);

    const sortBy = sortType.sortProperty.replace('-', '');
    const orderBy = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    fetch(
      `https://64074338862956433e6a09d1.mockapi.io/items?${category}&sortBy=${sortBy}&order=${orderBy}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  console.log(categoryId, sortType);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(index) => setCategoryId(index)} />
        <Short value={sortType} onClickSortType={(index) => setTypeSort(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
