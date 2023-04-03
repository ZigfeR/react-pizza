import React from 'react';

type CategoriesProps = {
  value: number;
  onClickCategory: (index: number) => void;
  itemsCategory: any;
};

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, itemsCategory, onClickCategory }) => {
    return (
      <div className="categories">
        <ul>
          {value === 0
            ? itemsCategory.map((obj: any) => (
                <li
                  key={obj.id}
                  onClick={() => onClickCategory(obj.id)}
                  className={'Все' === obj.name ? 'active' : ''}>
                  {obj.name}
                </li>
              ))
            : itemsCategory.map((obj: any) => (
                <li
                  key={obj.id}
                  onClick={() => onClickCategory(obj.id)}
                  className={value === obj.id ? 'active' : ''}>
                  {obj.name}
                </li>
              ))}
        </ul>
      </div>
    );
  },
);
