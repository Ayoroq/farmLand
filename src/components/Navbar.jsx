import { Link } from "react-router";
import style from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={style.navbar}>
      <ul className={style.leftNav}>
        <li className={style.logo}>
          <Link to="/">FarmLand</Link>
        </li>
      </ul>
      <ul className={style.rightNav}>
        <li className={style.navItem}>
          <Link to="/shop">Shop</Link>
        </li>
        <li className={style.navItem}>
          <Link to="/about">Who we are</Link>
        </li>
        <li className={style.navItem}>
          <Link to="/contact">Find Us</Link>
        </li>
        <li className={`${style.basketBtnContainer} ${style.navItem}`}>
          <button className={style.basketBtn}>
            <Link to="/basket">Basket</Link>
          </button>
        </li>
      </ul>
    </nav>
  );
}
