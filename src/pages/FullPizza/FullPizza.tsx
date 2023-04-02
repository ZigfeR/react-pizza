import axios from 'axios';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import styles from './FullPizza.module.scss';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://64074338862956433e6a09d1.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('error.message');
        navigate('/');
      }
    }
    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return (
      <div className={styles.loaderBody}>
        <div className={styles.loader}>
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24px"
            height="30px"
            viewBox="0 0 24 30">
            <rect x="0" y="13" width="4" height="5">
              <animate
                attributeName="height"
                attributeType="XML"
                values="5;21;5"
                begin="0s"
                dur="0.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                attributeType="XML"
                values="13; 5; 13"
                begin="0s"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="10" y="13" width="4" height="5">
              <animate
                attributeName="height"
                attributeType="XML"
                values="5;21;5"
                begin="0.15s"
                dur="0.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                attributeType="XML"
                values="13; 5; 13"
                begin="0.15s"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="20" y="13" width="4" height="5">
              <animate
                attributeName="height"
                attributeType="XML"
                values="5;21;5"
                begin="0.3s"
                dur="0.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                attributeType="XML"
                values="13; 5; 13"
                begin="0.3s"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </rect>
          </svg>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.root}>
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4 className={styles.h4}>{pizza.price} грн</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
