import styles from "./Shop.module.css";
import { useState } from "react";
import ShopCard from "../../components/Card";
import { products } from "../../data/products";

export default function Shop() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <main className={styles.shop}>
      <header className={styles.shopHeader}>
        <div className={styles.headerleft}>
          <h1>Produce</h1>
          <p>
            Fresh — <span>{formattedDate}</span>
          </p>
        </div>
        <div className={styles.headerright}>
          <button className={styles.filterDropdown}>
            Filter & Sort{" "}
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
        </div>
      </header>
      <section className={styles.shopSection}>
        {products.map((product) => (
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
