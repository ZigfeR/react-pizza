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

  const [itemsCategory, setItemsCategory] = React.useState([]);
  React.useEffect(() => {
    fetch('https://64074338862956433e6a09d1.mockapi.io/categories')
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItemsCategory(arr);
      });
  }, []);
  const [itemsPizza, setsItemsPizza] = React.useState([]);
  React.useEffect(() => {
    fetch('https://64074338862956433e6a09d1.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setsItemsPizza(arr);
      });
  }, []);
  const itemsLimit = 8;

  React.useEffect(() => {
    const getPizzas = async () => {
      const paramsFetch = {
        page: currentPage,
        limit: itemsLimit,
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
  const itemsPage = Math.ceil(itemsPizza.length / itemsLimit);
  //напиши код пагинации страницы который следит за состоянием массива
  const currentPages =
    pizzas.length % itemsLimit === 0
      ? Math.ceil(pizzas.length / itemsLimit) + 1
      : Math.ceil(pizzas.length / itemsLimit);
  const skeletons = [...new Array(itemsLimit)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={onClickCategory}
          itemsCategory={itemsCategory}
        />
        <SortPopup value={sort} />
      </div>
      {categoryId === 0 ? (
        <h2 className="content__title">Все пиццы</h2>
      ) : (
        itemsCategory.map((obj: any) => (
          <h2 key={obj.id} className="content__title">
            {categoryId === obj.id ? `${obj.name} пиццы` : ''}
          </h2>
        ))
      )}
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
      {categoryId === 0 ? (
        <Pagination onChangePage={onChangePage} itemsPage={itemsPage} />
      ) : (
        <Pagination onChangePage={onChangePage} itemsPage={currentPages} />
      )}
    </div>
  );
};

export default Home;
