import React from 'react';
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';

type CategoriesProps = {
  value: number;
  onClickCategory: (index: number) => void;
};

const categories = ['Все', 'Мяcные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
  useWhyDidYouUpdate('Categories', { value, onClickCategory });

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
