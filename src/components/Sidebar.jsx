import { Link } from "react-router";
import { forwardRef } from "react";
import style from "./Navbar.module.css";

const Sidebar = forwardRef(({ toggleMenu }, ref) => {
  return (
    <section className={style.sideBar} ref={ref} role="navigation" aria-label="Sidebar Navigation Menu">
      <header className={style.sideBarHeader}>
        <button 
          type="button" 
          onClick={toggleMenu} 
          className={style.menubtn} 
          aria-label="Close navigation menu"
        >
          <svg
            className={style.closeIcon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </header>
      <main className={style.sideBarMain}>
        <ul className={style.sideBarNav}>
          <li className={style.navItem} onClick={toggleMenu}>
            <Link to="/shop">Shop</Link>
          </li>
          <li className={style.navItem} onClick={toggleMenu}>
            <Link to="/about">Who we are</Link>
          </li>
          <li className={style.navItem} onClick={toggleMenu}>
            <Link to="/contact">Find Us</Link>
          </li>
        </ul>
      </main>
    </section>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;