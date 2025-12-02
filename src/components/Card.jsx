import styles from "./Card.module.css";
import { Link } from "react-router";
import { useContext } from "react";
import { BasketContext } from "../context/BasketContext";

export default function ShopCard(props) {
  const basket = useContext(BasketContext);

  const handleAddToBasket = (e) => {
    e.preventDefault();
    e.stopPropagation();
    basket.addToBasket(props);
  };

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
        <button onClick={handleAddToBasket}>Add to Basket</button>
      </div>
    </Link>
  );
}

function CartCard(props) {
  const basket = useContext(BasketContext);

  function increaseQuantity() {
    basket.changeQuantity(props, props.quantity + 1);
  }

  function decreaseQuantity() {
    if (props.quantity <= 1) {
      basket.removeFromBasket(props);
    } else {
      basket.changeQuantity(props, props.quantity - 1);
    }
  }

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
          <div className={styles.subDetailsContainer}>
            <h3>{props.name}</h3>
            <p>
              ${props.price} / <span>{props.unit}</span>
            </p>
          </div>
          <div className={styles.CartCardQuantity}>
            <p className={styles.CartCardQuantityLabel}>
              <input
                type="number"
                readOnly
                min={0}
                className={styles.quantityInput}
                value={props.quantity}
              />
              <span className={styles.QuantityUnit}>{props.unit}</span>
            </p>
            <div className={styles.CartCardQuantityButtons}>
              <button
                onClick={decreaseQuantity}
                className={`${styles.CartCardQuantityButton} ${styles.CartCardQuantityButtonSub}`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="remove">
                    <path
                      id="Vector"
                      d="M10 25.5V22.5H38V25.5H10Z"
                      fill="currentcolor"
                    />
                  </g>
                </svg>
              </button>
              <button
                onClick={increaseQuantity}
                className={`${styles.CartCardQuantityButton} ${styles.CartCardQuantityButtonAdd}`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="add">
                    <path
                      id="Vector"
                      d="M22.5 42V25.5H6V22.5H22.5V6H25.5V22.5H42V25.5H25.5V42H22.5Z"
                      fill="currentcolor"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.CartCardRight}>
        <p className={styles.CartCardAmount}>
          ${(props.price * props.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => basket.removeFromBasket(props)}
          className={styles.CartCardRemove}
        >
          <svg
            className={styles.CartCardRemoveIcon}
            width="30"
            height="30"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Material Symbols Icon (1) 1">
              <path
                id="Vector"
                d="M13.05 42C12.225 42 11.5188 41.7062 10.9315 41.1185C10.3438 40.5312 10.05 39.825 10.05 39V10.5H8V7.5H17.4V6H30.6V7.5H40V10.5H37.95V39C37.95 39.8 37.65 40.5 37.05 41.1C36.45 41.7 35.75 42 34.95 42H13.05ZM34.95 10.5H13.05V39H34.95V10.5ZM18.35 34.7H21.35V14.75H18.35V34.7ZM26.65 34.7H29.65V14.75H26.65V34.7Z"
                fill="#EA3323"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}

export { CartCard };
