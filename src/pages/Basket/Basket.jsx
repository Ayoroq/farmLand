import styles from "./Basket.module.css";
import { useContext } from "react";
import { BasketContext } from "../../context/BasketContext.jsx";
import {CartCard} from "../../components/Card.jsx"

export default function Basket() {
  const basket = useContext(BasketContext);
  const totalItems = basket.getTotalItems();
  return (
    <div className={styles.basket}>
      <header className={styles.basketHeader}>
        <h1>Basket</h1>
        <p>
          {totalItems} {totalItems > 0 ? "items" : "item"}
        </p>
      </header>
      <main className={styles.basketMain}>
        {!totalItems && (
          <div className={styles.basketEmpty}>
            <h2>Your basket is empty</h2>
            <p>Start adding items to your basket</p>
          </div>
        )}
        {totalItems > 0 && (
          <>
            <section className={styles.basketContainer}>
              <div className={styles.basketItems}>
                {basket.basket.map((item, index) => (
                  <div key={index} className={styles.basketItem}>
                    {CartCard(item)}
                  </div>
                ))}
              </div>
            </section>
            <section className={styles.basketCheckout}>
              <div className={styles.basketCheckoutDetails}>
                <h3>Subtotal</h3>
                <p>
                  $
                  {basket.basket
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </p>
              </div>
              <div className={styles.basketCheckoutDetails}>
                <h3>Shipping</h3>
                <p>Free</p>
              </div>
              <div className={styles.basketCheckoutDetails}>
                <h3>Total</h3>
                <p>
                  $
                  {basket.basket
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </p>
              </div>
              <button>Checkout</button>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
