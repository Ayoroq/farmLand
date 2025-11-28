import styles from "./Basket.module.css";
import { useContext } from "react";
import { BasketContext } from "../../context/BasketContext.jsx";

export default function Basket() {
  const basket = useContext(BasketContext);
  const totalItems = basket.getTotalItems();
  return (
    <main className={styles.basketMain}>
      {!totalItems && (
        <div className={styles.basketEmpty}>
          <h2>Your basket is empty</h2>
          <p>Start adding items to your basket</p>
        </div>
      )}
      {totalItems > 0 && (
        <div className={styles.basketContainer}>
          <div className={styles.basketItems}>
            {basket.basket.map((item, index) => (
              <div className={styles.basketItem} key={index}>
                <img src={item.image} alt={item.name} />
                <div className={styles.basketItemDetails}>
                  <h3>{item.name}</h3>
                  <p>${item.price} / <span>{item.unit}</span></p>
                  <div className={styles.basketItemQuantity}>
                    <button onClick={() => basket.removeFromBasket(item)}>-</button>
                    <p>{item.quantity}</p>
                    <button onClick={() => basket.addToBasket(item)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
