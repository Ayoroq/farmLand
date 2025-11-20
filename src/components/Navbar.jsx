import { Link } from "react-router";
import { useState, useEffect } from "react";
import style from "./Navbar.module.css";

export default function Navbar() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    const menu = document.querySelector(`.${style.menubtn}`);
    if (newMenuState) {
      menu.classList.add(style.open);
    } else {
      menu.classList.remove(style.open);
    }
  };

  if (screenWidth < 530) {
    return (
      <nav className={style.navbar}>
        <ul className={style.nav}>
          <button className={style.menubtn} onClick={toggleMenu}>
            <span className={style.span}></span>
            <span className={style.span}></span>
            <span className={style.span}></span>
          </button>
          <li className={style.logo}>
            <Link to="/">FarmLand</Link>
          </li>
        </ul>
      </nav>
    );
  }
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
