import { useAppSelector } from '@/hooks/global';
import { selectCartItemById } from '@store/cart/selector';
import { addProduct } from '@store/cart/slice';
import { CartItem } from '@store/cart/types';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const PIZZAS_TYPES_MAP = ['slime', 'traditional'];

type PizzaCardProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

const PizzaCard: React.FC<PizzaCardProps> = ({
  id = '',
  title = '',
  price = 0,
  imageUrl = '',
  sizes = null,
  types = null,
}) => {
  const dispatch = useDispatch();
  const store = useAppSelector(selectCartItemById(id));

  const { item } = store || {};

  // const [count, setCount] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const [activeType, setActiveType] = useState(0);

  const count = item?.count || 0;

  const onAddPizza = () => {
    const item: CartItem = { id, title, price, imageUrl, activeSize, activeType, count: 0 };
    dispatch(addProduct(item));
  };

  return (
    <div className="pizza-block__wrapper">
      <div className="pizza-block">
        {imageUrl ? (
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        ) : (
          <Skeleton
            circle
            height={260}
            style={{ marginBottom: '20px' }}
            className="pizza-block__image"
          />
        )}
        <Link to={`/pizza/${id}`}>
          <h4 className="pizza-block__title">{title || <Skeleton width={200} />}</h4>
        </Link>
        <div className="pizza-block__selector">
          {types ? (
            <ul>
              {types.map((t, idx) => (
                <li
                  key={`${id}_${t}_${idx}`}
                  onClick={setActiveType.bind(null, t)}
                  className={t === activeType ? 'active' : ''}>
                  {PIZZAS_TYPES_MAP[t]}
                </li>
              ))}
            </ul>
          ) : (
            <Skeleton />
          )}

          {sizes ? (
            <ul>
              {sizes.map((s, idx) => (
                <li
                  key={`${id}_${s}_${idx}`}
                  onClick={setActiveSize.bind(null, idx)}
                  className={idx === activeSize ? 'active' : ''}>
                  {s} см.
                </li>
              ))}
            </ul>
          ) : (
            <Skeleton />
          )}
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">from {price || <Skeleton />} $</div>
          <div className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span onClick={onAddPizza}>Add to</span>
            {count > 0 && <i>{count}</i>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
