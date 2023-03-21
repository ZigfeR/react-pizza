import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizzas } from './../redux/slices/pizzaSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizza);
  const sortType = sort.sortProperty;

  const { searchValue } = React.useContext(SearchContext);

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

    dispatch(
      fetchPizzas({
        paramsFetch,
      }),
    );
  };

  React.useEffect(
    () => {
      window.scrollTo(0, 0);

      getPizzas();
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [categoryId, sortType, searchValue, currentPage],
  );

  const pizzes = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div>
          <h2>
            Произошла ошибка <icon>😕</icon>
          </h2>
          <p>К сожалению не удалось полуучить пиццы</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzes}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
