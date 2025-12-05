import styles from "./Basket.module.css";
import { useContext, } from "react";
import { BasketContext } from "../../context/BasketContext.jsx";
import { CartCard } from "../../components/Card.jsx";
import { useNavigate } from "react-router";

export default function Basket() {
  const navigate = useNavigate();
  const basket = useContext(BasketContext);
  const totalItems = basket.getTotalItems();
  const taxAmount = basket.getTax().toFixed(2);
  const shipping = basket.getShipping();
  const subTotal = basket.getSubTotal().toFixed(2);
  const totalAfterTaxAndShipping = basket.getTotal().toFixed(2);
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
            <button className={styles.basketEmptyButton} onClick={() => navigate("/shop")}>Shop Now</button>
          </div>
        )}
        {totalItems > 0 && (
          <>
            <section className={styles.basketContainer}>
              <div className={styles.basketItems}>
                {basket.basket.map((item, index) => (
                  <div key={index} className={styles.basketItem}>
                    <CartCard {...item} />
                  </div>
                ))}
              </div>
            </section>
            <section className={styles.basketCheckout}>
              <header className={styles.basketCheckoutHeader}>
                <h1>Order Summary</h1>
              </header>
              <div className={styles.basketCheckoutDetailsContainer}>
                <div className={styles.basketCheckoutDetails}>
                  <p className={styles.basketCheckoutDetailsHeader}>Subtotal</p>
                  <p>${subTotal}</p>
                </div>
                <div className={styles.basketCheckoutDetails}>
                  <p className={styles.basketCheckoutDetailsHeader}>Shipping</p>
                  <p>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</p>
                </div>
                <div className={styles.basketCheckoutDetails}>
                  <p className={styles.basketCheckoutDetailsHeader}>Tax</p>
                  <p>${taxAmount}</p>
                </div>
                <div className={styles.basketCheckoutDetails}>
                  <h3>Total</h3>
                  <p>${totalAfterTaxAndShipping}</p>
                </div>
              </div>
              <button className={styles.checkOutButton}>
                <p>Continue to Payment</p>
                <svg
                  width="22"
                  height="15"
                  viewBox="0 0 22 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="Arrow 1"
                    d="M1 6.36401C0.447715 6.36401 0 6.81173 0 7.36401C0 7.9163 0.447715 8.36401 1 8.36401V7.36401V6.36401ZM21.7071 8.07112C22.0976 7.6806 22.0976 7.04743 21.7071 6.65691L15.3431 0.292946C14.9526 -0.0975784 14.3195 -0.0975784 13.9289 0.292946C13.5384 0.68347 13.5384 1.31664 13.9289 1.70716L19.5858 7.36401L13.9289 13.0209C13.5384 13.4114 13.5384 14.0446 13.9289 14.4351C14.3195 14.8256 14.9526 14.8256 15.3431 14.4351L21.7071 8.07112ZM1 7.36401V8.36401L21 8.36401V7.36401V6.36401L1 6.36401V7.36401Z"
                    fill="currentcolor"
                  />
                </svg>
              </button>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
