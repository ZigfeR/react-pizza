import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

import { selectFilter, setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from './../redux/slices/pizzaSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);
  const sortType = sort.sortProperty;

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const paramsFetch = {
      page: currentPage,
      limit: 4,
      search: searchValue ? searchValue : '',
      category: categoryId > 0 ? categoryId : '',
      sortBy: sortType.replace('-', ''),
      order: sortType.includes('-') ? 'asc' : 'desc',
    };
    const queryString = Object.keys(paramsFetch)
      .map((key) => key + '=' + paramsFetch[key])
      .join('&');

    dispatch(
      fetchPizzas({
        queryString,
      }),
    );
    window.scrollTo(0, 0);
  };

  React.useEffect(
    () => {
      getPizzas();
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [categoryId, sortType, searchValue, currentPage],
  );

  const pizzas = items.map((obj) => (
    <Link key={obj.id} to={`/pizza/${obj.id}`}>
      <PizzaBlock {...obj} />
    </Link>
  ));
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <icon>😕</icon>
          </h2>
          <p>К сожалению не удалось полуучить пиццы</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
