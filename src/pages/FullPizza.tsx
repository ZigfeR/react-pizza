import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(
    () => {
      async function fetchPizza() {
        try {
          const { data } = await axios.get(
            'https://64074338862956433e6a09d1.mockapi.io/items/' + id,
          );
          setPizza(data);
        } catch (error) {
          alert('error.message');
          navigate('/');
        }
      }
      fetchPizza();
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (!pizza) {
    return <>Downloaded</>;
  }
  return (
    <div>
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} грн</h4>
    </div>
  );
}


export default FullPizza;
