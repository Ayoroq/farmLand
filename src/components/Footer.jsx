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
