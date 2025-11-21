import { Link } from "react-router";
import { useState, useEffect, useRef } from "react";
import style from "./Navbar.module.css";
import Sidebar from "./Sidebar.jsx";

export default function Navbar() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sideBarRef = useRef(null);
  const menuBtnRef = useRef(null);

  useEffect(() => {
    // Set initial screen width after component mounts
    setScreenWidth(window.innerWidth);

    const handleClickOutside = (event) => {
      if (!sideBarRef.current) return;

      const clickedInsideSidebar = sideBarRef.current.contains(event.target);
      const clickedInsideMenuBtn = menuBtnRef.current?.contains(event.target);

      if (!clickedInsideSidebar && !clickedInsideMenuBtn) {
        setIsMenuOpen(false);
        sideBarRef.current.classList.remove(style.open);
      }
    };

    const handleResize = () => {
      const newWidth = window.innerWidth;
      setScreenWidth(newWidth);

      // Close sidebar when screen becomes larger than 720px
      if (newWidth >= 720 && isMenuOpen) {
        setIsMenuOpen(false);
        if (sideBarRef.current) {
          sideBarRef.current.classList.remove(style.open);
        }
      }
    };
    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (!sideBarRef.current) return;
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    if (newMenuState) {
      sideBarRef.current.classList.add(style.open);
    } else {
      sideBarRef.current.classList.remove(style.open);
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
              ref={menuBtnRef}
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className={style.menuIcon}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M20 7L4 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>{" "}
                  <path
                    d="M20 12L4 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>{" "}
                  <path
                    d="M20 17L4 17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>{" "}
                </g>
              </svg>
            </button>
            <li className={style.navItem}>
              <Link to="/" className={style.logo}>
                FarmLand
              </Link>
            </li>
            <Link to="/basket" className={style.basketBtnMobile}>
              <img
                className={style.basketIconMobile}
                src="/src/assets/NavbarAssets/Shopping Basket Icon.svg"
                alt="shopping basket"
              />
            </Link>
          </ul>
        </nav>
        <Sidebar ref={sideBarRef} toggleMenu={toggleMenu} />
      </>
    );
  }
  return (
    <>
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
            <Link to="/basket" className={style.basketBtn}>Basket</Link>
          </li>
        </ul>
      </nav>
      <Sidebar ref={sideBarRef} toggleMenu={toggleMenu} />
    </>
  );
}
