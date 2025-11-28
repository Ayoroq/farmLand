import styles from "./Basket.module.css";
import {useContext} from "react";
import {BasketContext} from "../../context/BasketContext.jsx";

export default function Basket() {
  const basket = useContext(BasketContext);
  const totalItems = basket.getTotalItems();
  return (
    !totalItems && (
      <main className={styles.basketMain}>
        <div className={styles.basketEmpty}>
            YOUR CART IS EMPTY
        </div>
      </main>
    )
    ||
    (
      <main className={styles.basketMain}>
        <div className={styles.basketContainer}>
          <div className={styles.basketItems}>
            {basket.basket.map((item) => (
              <div className={styles.basketItem} key={item.id}>
                <div className={styles.basketItemImgContainer}>
                  <img src={item.image} alt={item.name} className={styles.basketItemImg} />
                </div>
                <div className={styles.basketItemDetailsContainer}>
                  <h3>{item.name}</h3>
                  <p>
                    ${item.price} / <span>{item.unit}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.basketSummary}>
            <h3>Summary</h3>
            <p>Total Items: {totalItems}</p>
            <p>Total Price: ${basket.basket.reduce((acc, item) => acc + item.price, 0)}</p>
            <button>Checkout</button>
          </div>
        </div>
      </main>
    )
  );
} 