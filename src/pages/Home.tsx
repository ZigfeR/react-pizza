import React from 'react';
import { useSelector } from 'react-redux';

import { Categories, SortPopup, PizzaBlock, Skeleton, Pagination } from '../components';

import { selectFilter } from '../redux/filter/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { selectPizzaData } from '../redux/pizza/selectors';
import { useAppDispatch } from '../redux/store';

import algoliasearch from 'algoliasearch';
import invarmen from '../invarmen.json';
import debounce from 'lodash.debounce';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { HitPizza, HitSearchResults } from '../redux/pizza/types';

const Home: React.FC = () => {
  interface HitCategories {
    objectID: string;
    name: string;
  }

  const client = algoliasearch(invarmen.API_KEY, invarmen.SECRET_KEY);
  const arrayCategories = client.initIndex('categories');
  const arrayPizzas = client.initIndex('pizzas');

  const [query, setQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<HitSearchResults>({
    hits: [],
    nbPages: 0,
    page: 0,
  });
  const [currentPagess, setCurrentPages] = React.useState(0);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPages(data.selected);
    window.scrollTo(0, 0);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(
    debounce(() => {
      dispatch(fetchPizzas({ query, page: currentPagess }));
    }, 100),
    [query, currentPagess],
  );

  React.useEffect(() => {
    const search = async () => {
      const { hits, nbPages, page } = await arrayPizzas.search<HitPizza>(query, {
        page: currentPagess,
      });
      setSearchResults({ hits, nbPages, page });
    };

    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, currentPagess]);

  const [hits, setHits] = React.useState<HitCategories[]>([]);

  React.useEffect(() => {
    arrayCategories
      .search<HitCategories>('')
      .then(({ hits }) => {
        setHits(hits);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useAppDispatch();

  const { categoryId, sort } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const onClickCategory = React.useCallback(
    (id: number) => {
      dispatch(setCategoryId(id));
    },
    [dispatch],
  );

  const pizzas = items.map((hit) => <PizzaBlock key={hit.objectID} {...hit} />);

  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} itemsCategory={hits} />
        <SortPopup value={sort} />
      </div>
      {categoryId === 0 ? (
        <h2 className="content__title">Все пиццы</h2>
      ) : (
        hits.map((obj: any) => (
          <h2 key={obj.objectID} className="content__title">
            {categoryId === obj.categoryId ? `${obj.name} пиццы` : ''}
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
        <Pagination pageCount={searchResults.nbPages} onPageChange={handlePageClick} />
      ) : (
        <Pagination pageCount={searchResults.nbPages} onPageChange={handlePageClick} />
      )}
    </div>
  );
};

export default Home;
