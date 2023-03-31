import React from 'react';
import { useDispatch } from 'react-redux';
import { setSort } from '../redux/filter/slice';
import { Sort, sortPropertyEnum } from '../redux/filter/types';

type SortItem = {
  name: string;
  sortProperty: sortPropertyEnum;
};
type SortPopupProps = {
  value: Sort;
};

export const sortList: SortItem[] = [
  { name: 'популярности🔺', sortProperty: sortPropertyEnum.RATING_ASC },
  { name: 'популярности🔻', sortProperty: sortPropertyEnum.RATING_DESC },
  { name: 'цене🔺', sortProperty: sortPropertyEnum.PRICE_ASC },
  { name: 'цене🔻', sortProperty: sortPropertyEnum.PRICE_DESC },
  { name: 'алфавиту🔺', sortProperty: sortPropertyEnum.TITLE_ASC },
  { name: 'алфавиту🔻', sortProperty: sortPropertyEnum.TITLE_DESC },
];

export const SortPopup: React.FC<SortPopupProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);

  const onClickListItem = (obj: SortItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, index) => (
              <li
                key={index}
                onClick={() => onClickListItem(obj)}
                className={value.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
