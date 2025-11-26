import styles from "./Shop.module.css";
import { useState, useRef, useEffect } from "react";
import ShopCard from "../../components/Card";
import { products } from "../../data/products";

export default function Shop() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filterAndSortDropdownIsActive, setfilterAndSortDropdownIsActive] =
    useState(false);
  const filterAndSort = useRef(null);
  const dropDown = useRef(null);

  function hideAndShowDropdown() {
    setfilterAndSortDropdownIsActive(!filterAndSortDropdownIsActive);
  }

  // function to hide dropdown when clicked on the outside
  useEffect(() => {
    function handleClick(e) {
      if (
        dropDown.current &&
        filterAndSort.current &&
        !dropDown.current.contains(e.target) &&
        !filterAndSort.current.contains(e.target)
      ) {
        setfilterAndSortDropdownIsActive(false);
      }
    }

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function sortByPriceAsc(){
    setFilteredProducts([...filteredProducts].sort((a, b) => a.price - b.price));
  }
  function sortByPriceDesc(){
    setFilteredProducts([...filteredProducts].sort((a, b) => b.price - a.price));
  }
  return (
    <main className={styles.shop}>
      <header className={styles.shopHeader}>
        <div className={styles.headerleft}>
          <h1>Produce</h1>
          <p>
            Fresh — <span>{formattedDate}</span>
          </p>
        </div>
        <div className={styles.headerRight}>
          <button
            className={styles.filterDropdown}
            ref={filterAndSort}
            onClick={hideAndShowDropdown}
          >
            <p className={styles.filterSortDropdownText}>Filter & Sort</p>
            <svg
              width="20"
              height="20"
              viewBox="0 0 19 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Group 4">
                <g id="Group 3">
                  <circle
                    id="Ellipse 282"
                    cx="5.5"
                    cy="14.5"
                    r="2"
                    stroke="currentcolor"
                  />
                  <line
                    id="Line 9"
                    x1="3.5"
                    y1="14.5"
                    x2="0.5"
                    y2="14.5"
                    stroke="currentcolor"
                    strokeLinecap="round"
                  />
                  <line
                    id="Line 8"
                    x1="7.5"
                    y1="14.5"
                    x2="18.5"
                    y2="14.5"
                    stroke="currentcolor"
                    strokeLinecap="round"
                  />
                </g>
                <g id="Group 1">
                  <circle
                    id="Ellipse 279"
                    cx="5.5"
                    cy="2.5"
                    r="2"
                    stroke="currentcolor"
                  />
                  <line
                    id="Line 4"
                    x1="7.5"
                    y1="2.5"
                    x2="18.5"
                    y2="2.5"
                    stroke="currentcolor"
                    strokeLinecap="round"
                  />
                  <line
                    id="Line 5"
                    x1="3.5"
                    y1="2.5"
                    x2="0.5"
                    y2="2.5"
                    stroke="currentcolor"
                    strokeLinecap="round"
                  />
                </g>
                <g id="Group 2">
                  <circle
                    id="Ellipse 280"
                    cx="13.5"
                    cy="8.5"
                    r="2"
                    stroke="currentcolor"
                  />
                  <line
                    id="Line 6"
                    x1="0.5"
                    y1="8.5"
                    x2="11.5"
                    y2="8.5"
                    stroke="currentcolor"
                    strokeLinecap="round"
                  />
                  <line
                    id="Line 7"
                    x1="18.5"
                    y1="8.5"
                    x2="15.5"
                    y2="8.5"
                    stroke="currentcolor"
                    strokeLinecap="round"
                  />
                </g>
              </g>
            </svg>
          </button>
          <div
            className={`${styles.filterAndSort} ${
              filterAndSortDropdownIsActive ? styles.showDropdown : ""
            }`}
            ref={dropDown}
          >
            <div className={styles.sort}>
              <h3>Sort By</h3>
              <div className={styles.sortDropdown}>
                <button className={styles.sortDropdownButton} onClick={sortByPriceAsc}>
                  Price
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="Arrow 1"
                      d="M6.36377 20C6.36377 20.5523 6.81148 21 7.36377 21C7.91605 21 8.36377 20.5523 8.36377 20H7.36377H6.36377ZM8.07088 0.292893C7.68035 -0.0976311 7.04719 -0.0976311 6.65666 0.292893L0.292702 6.65685C-0.0978226 7.04738 -0.0978226 7.68054 0.292702 8.07107C0.683226 8.46159 1.31639 8.46159 1.70692 8.07107L7.36377 2.41421L13.0206 8.07107C13.4111 8.46159 14.0443 8.46159 14.4348 8.07107C14.8254 7.68054 14.8254 7.04738 14.4348 6.65685L8.07088 0.292893ZM7.36377 20H8.36377L8.36377 1H7.36377H6.36377L6.36377 20H7.36377Z"
                      fill="black"
                    />
                  </svg>
                </button>
                <button className={styles.sortDropdownButton} onClick={sortByPriceDesc}>
                  Price
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="Arrow 1"
                      d="M8.36377 1C8.36377 0.447715 7.91605 0 7.36377 0C6.81148 0 6.36377 0.447715 6.36377 1H7.36377L8.36377 1ZM6.65666 20.7071C7.04719 21.0976 7.68035 21.0976 8.07088 20.7071L14.4348 14.3431C14.8254 13.9526 14.8254 13.3195 14.4348 12.9289C14.0443 12.5384 13.4111 12.5384 13.0206 12.9289L7.36377 18.5858L1.70692 12.9289C1.31639 12.5384 0.683226 12.5384 0.292702 12.9289C-0.0978226 13.3195 -0.0978226 13.9526 0.292702 14.3431L6.65666 20.7071ZM7.36377 1H6.36377L6.36377 20H7.36377H8.36377L8.36377 1L7.36377 1Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className={styles.filter}>
              <h3>Filter By</h3>
              <div className={styles.filterByDropdown}>
                <div className={styles.filterOption}>
                  <h4>Category</h4>
                  <div className={styles.filterOptionButtons}>
                    <button className={styles.filterOptionButton}>All</button>
                    <button className={styles.filterOptionButton}>
                      Fruits
                    </button>
                    <button className={styles.filterOptionButton}>
                      Vegetables
                    </button>
                    <button className={styles.filterOptionButton}>
                      Organic
                    </button>
                  </div>
                </div>
                <div className={styles.filterOption}>
                  <h4>Price</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className={styles.shopSection}>
        {filteredProducts.map((product) => (
          <ShopCard
            key={product.id}
            name={product.name}
            price={product.price}
            img={product.image}
            description={product.description}
            unit={product.unit}
          />
        ))}
      </section>
    </main>
  );
}
