import React from 'react';
import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Short from '../components/Short';

const Home = () => {
  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, setTypeSort] = React.useState({ name: 'популярности', sortProperty: 'rating' });

  React.useEffect(() => {
    setLoading(true);

    const paramsFetch = {
      page: currentPage,
      limit: 4,
      search: searchValue ? searchValue : '',
      // category: categoryId > 0 ? categoryId : '',
      sortBy: sortType.sortProperty.replace('-', ''),
      order: sortType.sortProperty.includes('-') ? 'asc' : 'desc',
    };
    const queryString = Object.keys(paramsFetch)
      .map((key) => key + '=' + paramsFetch[key])
      .join('&');

    fetch(`https://64074338862956433e6a09d1.mockapi.io/items?${queryString}`)
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzes = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(index) => setCategoryId(index)} />
        <Short value={sortType} onClickSortType={(index) => setTypeSort(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzes}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
