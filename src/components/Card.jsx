import styles from "./Card.module.css";
import { Link } from "react-router";
import { useContext } from "react";
import { BasketContext } from "../context/BasketContext";

export default function shopCard(props) {
  const basket = useContext(BasketContext);
  return (
    <Link to={`/shop/${props.slug}`} className={styles.ShopCard}>
      <div className={styles.ShopCardImgContainer}>
        <img
          src={props.img}
          alt={props.description}
          className={styles.ShopCardImg}
        />
      </div>
      <div className={styles.ShopCardDetailsContainer}>
        <h3>{props.name}</h3>
        <p>
          ${props.price} / <span>{props.unit}</span>
        </p>
        <button onClick={() => basket.addToBasket(props)}>Add to Basket</button>
      </div>
    </Link>
  );
}

function CartCard(props) {
  const basket = useContext(BasketContext);
  return (
    <div className={styles.CartCard}>
      <div className={styles.CartCardLeft}>
        <div className={styles.CartCardImgContainer}>
          <img
            src={props.image}
            alt={props.description}
            className={styles.CartCardImg}
          />
        </div>
        <div className={styles.CartCardDetailsContainer}>
          <h3>{props.name}</h3>
          <p>
            ${props.price} / <span>{props.unit}</span>
          </p>
          <div className={styles.CartCardQuantityContainer}>
            <button onClick={() => basket.removeFromBasket(props)}>-</button>
            <p>{props.quantity}</p>
            <button onClick={() => basket.addToBasket(props)}>+</button>
          </div>
        </div>
      </div>
      <div className={styles.CartCardRight}>
        <button onClick={() => basket.removeFromBasket(props)}>Remove</button>
        <p>
          $
          {(props.price * props.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export { CartCard };
