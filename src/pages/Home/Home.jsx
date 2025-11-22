import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        We’re <em className={styles.italic}>farmers</em>, <em className={styles.italic}>purveyors</em>, and <em className={styles.italic}>eaters</em> of organically grown food.
      </h1>
    </main>
  );
}