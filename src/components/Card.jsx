import styles from "./Card.module.css";
import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { BasketContext } from "../context/BasketContext";
import ImageWithLoading from "./ImageWithLoading";

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
    <div className={styles.ShopCard} onClick={() => navigate(`/shop/${props.slug}`)} data-testid="shopCard">
      <div className={styles.ShopCardImgContainer}>
        <ImageWithLoading
          src={props.image}
          alt={props.description}
          className={styles.ShopCardImg}
        />
      </div>
      <div className={styles.ShopCardDetailsContainer}>
        <div className={styles.ShopCardDetails}>
          <h3>{props.name}</h3>
          <p>
            ${props.price} / <span>{props.unit}</span>
          </p>
        </div>
        <button onClick={toggleBasket} className={styles.ShopCardButton} role="toggleBasket">
          {basket.basket.some((item) => item.id === props.id) ? (
            <svg 
              width="25"
              height="25"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-testid = 'in-cart'
            >
              <g id="in-cart">
                <path
                  id="Vector"
                  d="M10.2999 42.0001C9.63325 42.0001 9.02492 41.8001 8.47492 41.4001C7.92492 41.0001 7.56658 40.4668 7.39992 39.8001L1.89992 19.9001C1.76658 19.4334 1.84992 19.0001 2.14992 18.6001C2.44992 18.2001 2.84992 18.0001 3.34992 18.0001H13.4499L22.6999 4.5001C22.8666 4.3001 23.0499 4.14176 23.2499 4.0251C23.4499 3.90843 23.6833 3.8501 23.9499 3.8501C24.2166 3.8501 24.4499 3.90843 24.6499 4.0251C24.8499 4.14176 25.0333 4.3001 25.1999 4.5001L34.3999 18.0001H44.6999C45.1999 18.0001 45.5999 18.2001 45.8999 18.6001C46.1999 19.0001 46.2833 19.4334 46.1499 19.9001L40.5999 39.8001C40.4333 40.4668 40.0749 41.0001 39.5249 41.4001C38.9749 41.8001 38.3666 42.0001 37.6999 42.0001H10.2999ZM23.9999 33.0001C24.8333 33.0001 25.5416 32.7084 26.1249 32.1251C26.7083 31.5418 26.9999 30.8334 26.9999 30.0001C26.9999 29.1668 26.7083 28.4584 26.1249 27.8751C25.5416 27.2918 24.8333 27.0001 23.9999 27.0001C23.1666 27.0001 22.4583 27.2918 21.8749 27.8751C21.2916 28.4584 20.9999 29.1668 20.9999 30.0001C20.9999 30.8334 21.2916 31.5418 21.8749 32.1251C22.4583 32.7084 23.1666 33.0001 23.9999 33.0001ZM17.0999 18.0001H30.7499L23.9499 8.0001L17.0999 18.0001Z"
                  fill="#426B1F"
                />
              </g>
            </svg>
          ) : (
            <svg
              width="25"
              height="25"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="not-in-cart">
                <path
                  id="Vector"
                  d="M10.2998 42.0001C9.63309 42.0001 9.02476 41.8001 8.47476 41.4001C7.92476 41.0001 7.56642 40.4668 7.39976 39.8001L1.89976 19.9001C1.76642 19.4334 1.84692 19.0001 2.14126 18.6001C2.43526 18.2001 2.83809 18.0001 3.34976 18.0001H13.4498L22.6998 4.5001C22.8664 4.3001 23.0498 4.14176 23.2498 4.0251C23.4498 3.90843 23.6831 3.8501 23.9498 3.8501C24.2164 3.8501 24.4498 3.90843 24.6498 4.0251C24.8498 4.14176 25.0331 4.3001 25.1998 4.5001L34.3998 18.0001H44.6998C45.2114 18.0001 45.6143 18.2001 45.9083 18.6001C46.2026 19.0001 46.2831 19.4334 46.1498 19.9001L40.5998 39.8001C40.4331 40.4668 40.0748 41.0001 39.5248 41.4001C38.9748 41.8001 38.3664 42.0001 37.6998 42.0001H10.2998ZM10.2998 39.0001H37.6998L42.7498 21.0001H5.29976L10.2998 39.0001ZM24.0088 33.0001C24.8361 33.0001 25.5414 32.7054 26.1248 32.1161C26.7081 31.5271 26.9998 30.8188 26.9998 29.9911C26.9998 29.1638 26.7051 28.4584 26.1158 27.8751C25.5268 27.2918 24.8184 27.0001 23.9908 27.0001C23.1634 27.0001 22.4581 27.2948 21.8748 27.8841C21.2914 28.4731 20.9998 29.1814 20.9998 30.0091C20.9998 30.8364 21.2944 31.5418 21.8838 32.1251C22.4728 32.7084 23.1811 33.0001 24.0088 33.0001ZM17.0998 18.0001H30.7498L23.9498 8.0001L17.0998 18.0001Z"
                  fill="#426B1F"
                />
              </g>
            </svg>
          )}
        </button>
      </div>
    </div>
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
              <p className={styles.CartCardQuantityLabel}>
                <input
                  type="text"
                  readOnly
                  min={0}
                  className={styles.quantityInput}
                  value={props.quantity}
                  size={(props.quantity).toString().length}
                />
                <span className={styles.QuantityUnit}>{props.unit}</span>
              </p>
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
