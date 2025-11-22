import styles from "./Home.module.css";
import { Link } from "react-router";
import vegImage from "../../assets/HomeAssets/vegetables.png";
import multiVegImage from "../../assets/HomeAssets/multiple-veg.png";
import ArialViewVideo from "../../assets/HomeAssets/Aerial View of Farmland.mp4";

export default function Home() {
  return (
    <div className={styles.home}>
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
      <section className={`${styles.section} ${styles.section2}`}>
        <video
          src={ArialViewVideo}
          autoPlay
          muted
          loop
          type="video/mp4"
        ></video>
        <div className={styles.info}>
          <h4>WHAT WE BELIEVE</h4>
          <p>
            We believe in produce. Tasty produce. Produce like:
            <br />
            <br />
            Apples. Oranges.Limes. Lemons. Guavas. Carrots. Cucumbers. Jicamas.
            Cauliflowers. Brussels sprouts. Shallots. Japanese eggplants.
            Asparagus. Artichokes—Jerusalem artichokes, too. Radishes. Broccoli.
            Baby broccoli. Broccolini. Bok choy. Scallions. Ginger. Cherries.
            Raspberries. Cilantro. Parsley. Dill.
            <br />
            <br />
            What are we forgetting?
            <br />
            <br />
            Oh! Onions. Yams. Avocados. Lettuce. Arugula (to some, “rocket”).
            Persian cucumbers, in addition to aforementioned “normal” cucumbers.
            Artichokes. Zucchinis. Pumpkins. Squash (what some cultures call
            pumpkins). Sweet potatoes and potato-potatoes. Jackfruit. Monk
            fruit. Fruit of the Loom. Fruits of our labor (this website).
            Sorrel. Pineapple. Mango. Gooseberries. Blackberries. Tomatoes.
            Heirloom tomatoes. Beets. Chives. Corn. Endive. Escarole, which, we
            swear, we’re vendors of organic produce, but if you asked us to
            describe what escaroles are...
          </p>
        </div>
      </section>
    </div>
  );
}
