import styles from "./Card.module.css";
import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { BasketContext } from "../context/BasketContext";
import ImageWithLoading from "./ImageWithLoading";
import BasketIcon from "./BasketIcon";
import { MAX_QTY } from "../context/BasketContext";

export default function ShopCard(props) {
  const basket = useContext(BasketContext);
  const navigate = useNavigate();

  const toggleBasket = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (basket.basket.some((item) => item.id === props.id)) {
      basket.removeFromBasket(props);
    } else {
      basket.addToBasket(props);
    }
  };

  return (
    <div
      className={styles.ShopCard}
      onClick={() => navigate(`/shop/${props.slug}`)}
      data-testid="shopCard"
    >
      <div className={styles.ShopCardImgContainer}>
        <ImageWithLoading
          src={props.image}
          alt={props.description}
          className={styles.ShopCardImg}
        />
      </div>
      <div className={styles.ShopCardDetailsContainer}>
        <div className={styles.ShopCardDetails}>
          <p className={styles.ShopCardName}>{props.name}</p>
          <p className={styles.ShopCardPrice}>
            ${props.price} / <span>{props.unit}</span>
          </p>
        </div>
        <button
          onClick={toggleBasket}
          className={styles.ShopCardButton}
          role="toggleBasket"
        >
          <BasketIcon inCart={basket.basket.some((item) => item.id === props.id)} width={20} height={20} />
        </button>
      </div>
    </div>
  );
}

function CartCard(props) {
  const basket = useContext(BasketContext);

  function increaseQuantity() {
    if (props.quantity >= 1 && props.quantity < MAX_QTY) {
      basket.changeQuantity(props, props.quantity + 1);
    }
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
      <Link to={`/shop/${props.slug}`} className={styles.CartCardLeft}>
        <ImageWithLoading
          src={props.image}
          alt={props.description}
          className={styles.CartCardImg}
        />
      </Link>
      <div className={styles.CartCardRight}>
        <div className={styles.CartCardDetailsContainer}>
          <h3>{props.name}</h3>
          <div className={styles.CartCardPriceContainer}>
            <p className={styles.CartCardPrice}>
              ${props.price} / <span>{props.unit}</span>
            </p>
            <div className={styles.CartCardQuantity}>
              <div className={styles.CartCardQuantityButtons}>
                <button
                  onClick={decreaseQuantity}
                  aria-label="decreaseQuantity"
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
                <p className={styles.CartCardQuantityLabel}>
                  <input
                    type="text"
                    readOnly
                    min={0}
                    className={styles.quantityInput}
                    value={props.quantity}
                    size={props.quantity.toString().length}
                  />
                  <span className={styles.QuantityUnit}>{props.unit}</span>
                </p>
                <button
                  onClick={increaseQuantity}
                  aria-label="increaseQuantity"
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
        <div className={styles.CartCardAmountContainer}>
          <p className={styles.CartCardAmount}>
            ${(props.price * props.quantity).toFixed(2)}
          </p>
          <button
            onClick={() => basket.removeFromBasket(props)}
            className={styles.CartCardRemove}
            aria-label="removeFromBasket"
          >
            <svg
              className={styles.CartCardRemoveIcon}
              width="30"
              height="30"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="delete icon">
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
    </div>
  );
}

export { CartCard };
