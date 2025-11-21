import { Link } from "react-router";
import { useState, useEffect } from "react";
import style from "./Navbar.module.css";

export default function Navbar() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sideBar = document.querySelector(`.${style.sideBar}`);

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
      sideBar.classList.add(style.open);
    } else {
      menu.classList.remove(style.open);
      sideBar.classList.remove(style.open);
    }
  };

  if (screenWidth < 620) {
    return (
      <>
        <nav className={`${style.navbar} ${isMenuOpen ? style.menuOpen : ""}`}>
          <ul className={style.navbarMobile}>
            <button
              type="button"
              onClick={toggleMenu}
              className={style.menubtn}
            >
              <svg className={style.menuIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 7L4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M20 17L4 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
            </button>
            <li className={style.navItem}>
              <Link to="/" className={style.logo}>
                FarmLand
              </Link>
            </li>
            <button className={style.basketBtnMobile}>
              <Link to="/basket">
                <img
                  className={style.basketIconMobile}
                  src="/src/assets/NavbarAssets/Shopping Basket Icon.svg"
                  alt="shopping basket"
                />
              </Link>
            </button>
          </ul>
        </nav>
        <section className={style.sideBar}></section>
      </>
    );
  }
  return (
    <nav className={style.navbar}>
      <ul className={style.leftNav}>
        <li className={style.navItem}>
          <Link to="/" className={style.logo}>
            FarmLand
          </Link>
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
