import styles from "./Basket.module.css";
import { useContext } from "react";
import { BasketContext } from "../../context/BasketContext.jsx";

export default function Basket() {
  const basket = useContext(BasketContext);
  const totalItems = basket.getTotalItems();
  return (
    <div className={styles.basket}>
      <header className={styles.basketHeader}>
        <h1>Basket</h1>
        <p>{totalItems} items</p>
      </header>
      <main className={styles.basketMain}></main>
    </div>
  );
}
