import style from "./Home.module.css";

export default function Home() {
  return (<>
    <main className={style.main}>
      <h1 className={style.title}>We’re <span className={style.italic}>farmers</span>, <span className={style.italic}>purveyors</span>, and <span className={style.italic}>eaters</span> of <br/>organically grown food.</h1>
    </main>
    </>
  );
}