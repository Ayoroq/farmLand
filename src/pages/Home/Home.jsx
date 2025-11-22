import styles from "./Home.module.css";
import vegImage from "../../assets/HomeAssets/vegetables.png"
import multiVegImage from "../../assets/HomeAssets/multiple-veg.png"

export default function Home() {
  return (
    <>
    <main className={styles.main}>
      <h1 className={styles.title}>
        We’re <em className={styles.italic}>farmers</em>, <em className={styles.italic}>purveyors</em>, and <em className={styles.italic}>eaters</em> of organically grown food.
      </h1>
    </main>
    <section className={`${styles.section} ${styles.section1}`}>
          <div>
            <img src={vegImage} alt="Green Vegetable leafs" />
          </div>
          <div>
            <img src={multiVegImage} alt="Image of multiple images" />
          </div>
    </section>
    </>
  );
}