import style from "./Basket.module.css";

export default function Basket() {
  return (
    <main className={style.main}>
      <h1>Your Shopping Basket</h1>
      <p>Review the items in your basket before proceeding to checkout.</p>
    </main>
  );
}