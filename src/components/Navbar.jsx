import { Link } from "react-router";
import style from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={style.navbar}>
        <ul className={style.leftNav}>
            <li className={style.logo}><Link to="/">FarmLand</Link></li>
        </ul>
        <ul className={style.rightNav}>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/cart">Cart</Link></li>
        </ul>
    </nav>
  );
}
