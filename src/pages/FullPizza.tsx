import DefaultLoader from '@components/DefaultLoader/DefaultLoader';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pizza, setPizza] = useState<{ imageUrl: string; title: string; price: number }>();

  useEffect(() => {
    fetchPizza();
  }, [id]);

  const fetchPizza = async () => {
    try {
      const { data } = await axios.get(`https://626d16545267c14d5677d9c2.mockapi.io/items/${id}`);

      if (data) {
        setPizza(data);
      } else {
        setPizza({ imageUrl: '', title: '', price: 0 });
      }
    } catch (e) {
      console.error(e);
      //   alert(`Can't find pizza`);
      navigate('/');
    }
  };

  if (!pizza) {
    return <DefaultLoader />;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
