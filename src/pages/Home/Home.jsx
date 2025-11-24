import styles from "./Home.module.css";
import { Link } from "react-router";
import vegImage from "../../assets/HomeAssets/vegetables.png";
import multiVegImage from "../../assets/HomeAssets/multiple-veg.png";
import ArialViewVideo from "../../assets/HomeAssets/Aerial View of Farmland.mp4";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const sectionRef = useRef([]);
  const homeRef = useRef(null);

  return (
    <>
      <div className={styles.home}>
        <section className={`${styles.hero} ${styles.section}`}>
          <main className={styles.main}>
            <h1 className={styles.title}>
              We’re <em>farmers</em>,<em> purveyors</em>, and <em>eaters</em>
              <br></br>of organically grown food.
            </h1>
            <Link className={styles.shopButton} to="/shop">
              Browse Our Shop
            </Link>
          </main>
          <section className={styles.subSection}>
            <figure>
              <img src={vegImage} alt="Fresh organic green vegetables" />
              <figcaption>Fresh organic vegetables grown locally.</figcaption>
            </figure>

            <figure>
              <img src={multiVegImage} alt="A variety of organic produce" />
              <figcaption>
                A colorful variety of organic produce from our farms.
                <br />
                <b>Central California</b> — The person who grew these was
                located in Central California.
              </figcaption>
            </figure>
          </section>
        </section>
        <section className={`${styles.second} ${styles.section}`}>
          <section className={`${styles.secondPage}`}>
            <video
              src={ArialViewVideo}
              autoPlay
              muted
              loop
              type="video/mp4"
            ></video>

            <div className={styles.info}>
              <h2>WHAT WE BELIEVE</h2>
              <p>
                We believe in produce. Tasty produce. Produce like:
                <br />
                <br />
                Apples. Oranges. Limes. Lemons. Guavas. Carrots. Cucumbers.
                Jicamas. Cauliflowers. Brussels sprouts. Shallots. Japanese
                eggplants. Asparagus. Artichokes—Jerusalem artichokes, too.
                Radishes. Broccoli. Baby broccoli. Broccolini. Bok choy.
                Scallions. Ginger. Cherries. Raspberries. Cilantro. Parsley.
                Dill.
                <br />
                <br />
                What are we forgetting?
                <br />
                <br />
                Oh! Onions. Yams. Avocados. Lettuce. Arugula (to some,
                “rocket”). Persian cucumbers, in addition to aforementioned
                “normal” cucumbers. Artichokes. Zucchinis. Pumpkins. Squash
                (what some cultures call pumpkins). Sweet potatoes and
                potato-potatoes. Jackfruit. Monk fruit. Fruit of the Loom.
                Fruits of our labor (this website). Sorrel. Pineapple. Mango.
                Gooseberries. Blackberries. Tomatoes. Heirloom tomatoes. Beets.
                Chives. Corn. Endive. Escarole, which, we swear, we’re vendors
                of organic produce, but if you asked us to describe what
                escaroles are...
              </p>
            </div>
          </section>
        </section>
      </div>
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
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                id="X-Twitter-Logo--Streamline-Logos"
                height="20"
                width="20"
              >
                <desc>
                  X Twitter Logo Streamline Icon: https://streamlinehq.com
                </desc>
                <path
                  stroke="currentcolor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.2705 22.464 1.5 1.53589h5.22951L22.5 22.464h-5.2295Z"
                  stroke-width="1"
                ></path>
                <path
                  stroke="currentcolor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21.7578 1.53589 -8.313 8.91461"
                  stroke-width="1"
                ></path>
                <path
                  stroke="currentcolor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m2.24207 22.464 8.30673 -8.9078"
                  stroke-width="1"
                ></path>
              </svg>
              TWITTER
            </Link>
            <Link target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" fill="currentcolor" viewBox="0 0 56.7 56.7">
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
    </>
  );
}

{
  /* <p>
          © {new Date().getFullYear()} <b>Farmland</b>
        </p> */
}
