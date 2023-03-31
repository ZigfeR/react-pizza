import React from 'react';
import { useSelector } from 'react-redux';

import { Categories, SortPopup, PizzaBlock, Skeleton, Pagination } from '../components';

import { selectFilter } from '../redux/filter/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { selectPizzaData } from '../redux/pizza/selectors';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);
  const sortType = sort.sortProperty;

  const onClickCategory = React.useCallback(
    (id: number) => {
      dispatch(setCategoryId(id));
    },
    [dispatch],
  );

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  React.useEffect(() => {
    const getPizzas = async () => {
      const paramsFetch = {
        page: currentPage,
        limit: 8,
        search: searchValue ? searchValue : '',
        category: categoryId > 0 ? categoryId : '',
        sortBy: sortType.replace('-', ''),
        order: sortType.includes('-') ? 'asc' : 'desc',
      };

      function objectKeys<Obj extends Record<string, unknown>>(obj: Obj): (keyof Obj)[] {
        return Object.keys(obj) as (keyof Obj)[];
      }
      const queryString = objectKeys(paramsFetch)
        .map((key) => key + '=' + paramsFetch[key])
        .join('&');

      dispatch(
        fetchPizzas({
          queryString,
        }),
      );
      window.scrollTo(0, 0);
    };
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage, dispatch]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <SortPopup value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
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
