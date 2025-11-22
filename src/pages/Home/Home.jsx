import styles from "./Home.module.css";
import { Link } from "react-router";
import vegImage from "../../assets/HomeAssets/vegetables.png";
import multiVegImage from "../../assets/HomeAssets/multiple-veg.png";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>
          We’re <em>farmers</em>,<em> purveyors</em>, and <em>eaters</em>{" "}
          <br></br>of organically grown food.
        </h1>
        <Link className={styles.shopButton} to="/shop">
          Browse Our Shop
        </Link>
      </main>
      <section className={`${styles.section} ${styles.section1}`}>
        <figure>
          <img src={vegImage} alt="Fresh organic green vegetables" />
          <figcaption>Fresh organic vegetables grown locally.</figcaption>
        </figure>

        <figure>
          <img src={multiVegImage} alt="A variety of organic produce" />
          <figcaption>
            A colorful variety of organic produce from our farms.
            <br />
            <b>Central California</b> — The person who grew these was located in
            Central California and, er, hopefully very well-compensated.
          </figcaption>
        </figure>
      </section>
    </>
  );
}
