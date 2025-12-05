import { Link } from "react-router";
import { useState, useEffect, useRef, forwardRef } from "react";
import { useContext } from "react";
import { BasketContext } from "../context/BasketContext";
import style from "./Navbar.module.css";
import Sidebar from "./Sidebar.jsx";

const Navbar = forwardRef((props, ref) => {
  const basket = useContext(BasketContext);
  const [screenWidth, setScreenWidth] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sideBarRef = useRef(null);
  const menuBtnRef = useRef(null);

  // Initialize screen width after component mounts
  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  // Handle window resize events
  useEffect(() => {
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

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  // Handle click outside sidebar to close it
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event) => {
      if (!sideBarRef.current) return;

      const clickedInsideSidebar = sideBarRef.current.contains(event.target);
      const clickedInsideMenuBtn = menuBtnRef.current?.contains(event.target);

      if (!clickedInsideSidebar && !clickedInsideMenuBtn) {
        setIsMenuOpen(false);
        sideBarRef.current.classList.remove(style.open);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
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
  return (
    <>
      <nav
        className={`${style.navbar} ${isMenuOpen ? style.menuOpen : ""}`}
        role="navigation"
        ref={ref}
        id="nav"
      >
        {screenWidth < 620 ? (
          // Mobile layout
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
                  <path
                    d="M20 7L4 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M20 12L4 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M20 17L4 17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                </g>
              </svg>
            </button>
            <li className={style.navItem}>
              <Link to="/" className={style.logo}>
                FarmLand
              </Link>
            </li>
            <Link to="/basket" className={style.basketBtnMobile}>
              <svg
                className={style.basketIconMobile}
                width="30"
                height="30"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Shopping Basket Icon (1) 1">
                  <path
                    id="Vector"
                    d="M10.2999 42.0001C9.63325 42.0001 9.02492 41.8001 8.47492 41.4001C7.92492 41.0001 7.56658 40.4668 7.39992 39.8001L1.89992 19.9001C1.76658 19.4334 1.84992 19.0001 2.14992 18.6001C2.44992 18.2001 2.84992 18.0001 3.34992 18.0001H13.4499L22.6999 4.5001C22.8666 4.3001 23.0499 4.14176 23.2499 4.0251C23.4499 3.90843 23.6833 3.8501 23.9499 3.8501C24.2166 3.8501 24.4499 3.90843 24.6499 4.0251C24.8499 4.14176 25.0333 4.3001 25.1999 4.5001L34.3999 18.0001H44.6999C45.1999 18.0001 45.5999 18.2001 45.8999 18.6001C46.1999 19.0001 46.2833 19.4334 46.1499 19.9001L40.5999 39.8001C40.4333 40.4668 40.0749 41.0001 39.5249 41.4001C38.9749 41.8001 38.3666 42.0001 37.6999 42.0001H10.2999ZM23.9999 33.0001C24.8333 33.0001 25.5416 32.7084 26.1249 32.1251C26.7083 31.5418 26.9999 30.8334 26.9999 30.0001C26.9999 29.1668 26.7083 28.4584 26.1249 27.8751C25.5416 27.2918 24.8333 27.0001 23.9999 27.0001C23.1666 27.0001 22.4583 27.2918 21.8749 27.8751C21.2916 28.4584 20.9999 29.1668 20.9999 30.0001C20.9999 30.8334 21.2916 31.5418 21.8749 32.1251C22.4583 32.7084 23.1666 33.0001 23.9999 33.0001ZM17.0999 18.0001H30.7499L23.9499 8.0001L17.0999 18.0001Z"
                    fill="#426B1F"
                  />
                </g>
              </svg>

              {basket.getTotalItems() > 0 && (
                <span className={style.basketCountMobile}>
                  {basket.getTotalItems()}
                </span>
              )}
            </Link>
          </ul>
        ) : (
          // Desktop layout
          <>
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
                <Link to="/basket" className={style.basketBtn}>
                  Basket{" "}
                  {basket.getTotalItems() > 0 && (
                    <span className={style.basketCount}>
                      {basket.getTotalItems()}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </>
        )}
      </nav>
      <Sidebar ref={sideBarRef} toggleMenu={toggleMenu} />
    </>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
