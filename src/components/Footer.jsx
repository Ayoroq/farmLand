import { Link } from "react-router";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer1}>
        <nav className={styles.footerNav}>
          <div className={styles.footerNav1}>
            <Link to="/shop">SHOP</Link>
            <Link to="/about">WHO WE ARE</Link>
            <Link to="/#">JOURNAL</Link>
            <Link to="/contact">FIND US</Link>
          </div>
          <div className={styles.footerNav1}>
            <Link to="/#">FAQ</Link>
            <Link to="/#">RECIPES</Link>
            <Link to="/#">EVENT</Link>
            <Link to="/#">CONNECT</Link>
          </div>
        </nav>
        <section className={styles.newsletter}>
          <h3>
            Get updates & special <br /> announcements.
          </h3>
          <p className={styles.newsletterEmail}>
            <label>
              <input type="email" placeholder="EMAIL ADDRESS" />
            </label>
            <button className={styles.newsletterButton}>
              JOIN LIST{" "}
              <span>
                <svg
                  width="25"
                  height="30"
                  viewBox="0 0 420 420"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Material Symbols Trending Flat Icon 1">
                    <path
                      id="Vector"
                      d="M307.125 288.313L288.312 269.938L334.688 223.563H52.5V197.313H335.125L288.75 150.938L307.125 132.562L385 210.438L307.125 288.313Z"
                      fill="currentcolor"
                    />
                  </g>
                </svg>
              </span>
            </button>
          </p>
        </section>
      </div>
      <div className={styles.footerContainer2}>
        <div className={styles.footerContainer2Links}>
          <Link target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 32 32">
              <path
                fill="currentcolor"
                d="M32 30a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v28z"
              ></path>
              <path
                fill=""
                d="M22 32V20h4l1-5h-5v-2c0-2 1.002-3 3-3h2V5h-4c-3.675 0-6 2.881-6 7v3h-4v5h4v12h5z"
              ></path>
            </svg>
            FACEBOOK
          </Link>
          <Link target="_blank" rel="noopener noreferrer">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5798 17.3332L11.7164 8.78517L11.7264 8.79317L17.0131 2.6665H15.2464L10.9398 7.65317L7.51976 2.6665H2.88643L8.36043 10.6472L8.35976 10.6465L2.58643 17.3332H4.35309L9.14109 11.7852L12.9464 17.3332H17.5798ZM6.81976 3.99984L15.0464 15.9998H13.6464L5.41309 3.99984H6.81976Z"
                fill="currentcolor"
              />
            </svg>
            TWITTER
          </Link>
          <Link target="_blank" rel="noopener noreferrer">
            <svg
              width="20"
              height="20"
              fill="currentcolor"
              viewBox="0 0 56.7 56.7"
            >
              <path d="M28.2 16.7c-7 0-12.8 5.7-12.8 12.8s5.7 12.8 12.8 12.8S41 36.5 41 29.5s-5.8-12.8-12.8-12.8zm0 21c-4.5 0-8.2-3.7-8.2-8.2s3.7-8.2 8.2-8.2 8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2z"></path>
              <circle cx="41.5" cy="16.4" r="2.9"></circle>
              <path d="M49 8.9c-2.6-2.7-6.3-4.1-10.5-4.1H17.9c-8.7 0-14.5 5.8-14.5 14.5v20.5c0 4.3 1.4 8 4.2 10.7 2.7 2.6 6.3 3.9 10.4 3.9h20.4c4.3 0 7.9-1.4 10.5-3.9 2.7-2.6 4.1-6.3 4.1-10.6V19.3c0-4.2-1.4-7.8-4-10.4zm-.4 31c0 3.1-1.1 5.6-2.9 7.3s-4.3 2.6-7.3 2.6H18c-3 0-5.5-.9-7.3-2.6C8.9 45.4 8 42.9 8 39.8V19.3c0-3 .9-5.5 2.7-7.3 1.7-1.7 4.3-2.6 7.3-2.6h20.6c3 0 5.5.9 7.3 2.7 1.7 1.8 2.7 4.3 2.7 7.2v20.6z"></path>
            </svg>
            INSTAGRAM
          </Link>
        </div>
        <div className={`${styles.footerContainer2Links} ${styles.footerLast}`}>
          <div className={styles.footerContainer2Links1}>
            <p>
              <Link
                to="https://maps.app.goo.gl/WywbskzGUXkADE2s7"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 43.6998C20.0333 43.6998 16.4833 42.654 13.35 40.5623C10.2167 38.4706 7.85833 35.7748 6.275 32.4748C5.906 32.3128 5.56083 32.1586 5.2395 32.0123C4.91783 31.866 4.60467 31.7118 4.3 31.5498C3.65067 31.2175 3.14667 30.7563 2.788 30.1663C2.42933 29.5766 2.25 28.9128 2.25 28.1748V19.8248C2.25 19.0868 2.42933 18.423 2.788 17.8333C3.14667 17.2433 3.65067 16.7821 4.3 16.4498C4.60467 16.2878 4.91783 16.1336 5.2395 15.9873C5.56083 15.841 5.906 15.6868 6.275 15.5248C7.85833 12.2248 10.2167 9.52897 13.35 7.4373C16.4833 5.34564 20.0333 4.2998 24 4.2998C27.9667 4.2998 31.5167 5.34564 34.65 7.4373C37.7833 9.52897 40.1417 12.2248 41.725 15.5248C42.094 15.6868 42.4392 15.841 42.7605 15.9873C43.0822 16.1336 43.3953 16.2878 43.7 16.4498C44.3327 16.7818 44.8325 17.2481 45.1995 17.8488C45.5665 18.4495 45.75 19.1081 45.75 19.8248V28.1748C45.75 28.8998 45.5667 29.5601 45.2 30.1558C44.8333 30.7518 44.3333 31.2165 43.7 31.5498C43.3953 31.7118 43.0822 31.866 42.7605 32.0123C42.4392 32.1586 42.094 32.3128 41.725 32.4748C40.1417 35.7748 37.7833 38.4706 34.65 40.5623C31.5167 42.654 27.9667 43.6998 24 43.6998ZM24.05 40.8248C26.664 40.8248 29.1623 40.1915 31.545 38.9248C33.9277 37.6581 35.9127 35.9081 37.5 33.6748C35.4387 34.3081 33.2108 34.8081 30.8165 35.1748C28.4222 35.5415 26.1667 35.7248 24.05 35.7248C21.9 35.7248 19.6167 35.5415 17.2 35.1748C14.7833 34.8081 12.5333 34.3081 10.45 33.6748C12.1707 35.9415 14.239 37.6998 16.655 38.9498C19.071 40.1998 21.536 40.8248 24.05 40.8248ZM24.05 7.1248C21.536 7.1248 19.071 7.7498 16.655 8.9998C14.239 10.2498 12.1707 12.0081 10.45 14.2748C12.5333 13.6415 14.7833 13.1415 17.2 12.7748C19.6167 12.4081 21.9 12.2248 24.05 12.2248C26.1667 12.2248 28.4222 12.4081 30.8165 12.7748C33.2108 13.1415 35.4387 13.6415 37.5 14.2748C35.9127 12.0415 33.9277 10.2915 31.545 9.0248C29.1623 7.75814 26.664 7.1248 24.05 7.1248ZM24.05 32.8498C27.75 32.8498 31.2208 32.4581 34.4625 31.6748C37.7042 30.8915 40.5083 29.8715 42.875 28.6148V19.3348C40.5083 18.0781 37.7042 17.0665 34.4625 16.2998C31.2208 15.5331 27.75 15.1498 24.05 15.1498C20.3167 15.1498 16.8292 15.5331 13.5875 16.2998C10.3458 17.0665 7.525 18.0781 5.125 19.3348V28.6148C7.525 29.8715 10.3458 30.8915 13.5875 31.6748C16.8292 32.4581 20.3167 32.8498 24.05 32.8498Z"
                    fill="currentcolor"
                  />
                </svg>
                43°39'07"N / 79°23'31"W
              </Link>
            </p>
            <p>
              © {new Date().getFullYear()} <b>Farmland</b>
            </p>
          </div>
          <div className={styles.footerContainer2Links1}>
            <Link to="/#">PRIVACY POLICY</Link>
            <Link to="/#"> TERMS OF SERVICE</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
