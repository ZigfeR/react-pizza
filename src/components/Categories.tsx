import React from 'react';

type CategoriesProps = {
  value: number;
  onClickCategory: (index: number) => void;
};

export const Categories: React.FC<CategoriesProps> = React.memo(({ value, onClickCategory }) => {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch('https://64074338862956433e6a09d1.mockapi.io/categories')
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
      });
  }, []);

  return (
    <div className="categories">
      <ul>
        {items.map((obj: any) => (
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
});
