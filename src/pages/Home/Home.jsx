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

  useGSAP(() => {
    const Navbar = document.querySelector("#nav");
    const NavbarHeight = Navbar ? Navbar.offsetHeight : 0;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: homeRef.current,
        start: `top ${NavbarHeight + 10}px`,
        end: "+=" + (sectionRef.current.length - 1) * 100 + "%",
        scrub: true,
        pin: true,
        pinSpacing: true,
      },
    });

    sectionRef.current.forEach((section, i) => {
      if (i === 0) return;
      tl.from(section, {
        xPercent: 100,
        opacity: 0,
        duration: 1,
        ease: "none",
      });
    });
  });

  return (
    <div className={styles.home} ref={homeRef}>
      <section
        className={`${styles.hero} ${styles.section} ${styles.red}`}
        ref={(el) => {
          if (el && !sectionRef.current.includes(el)) {
            sectionRef.current.push(el);
          }
        }}
      >
        <main className={styles.main}>
          <h1 className={styles.title}>
            We’re <em>farmers</em>,<em> purveyors</em>, and <em>eaters</em>
            <br></br>of organically grown food.
          </h1>
          <Link className={styles.shopButton} to="/shop">
            Browse Our Shop
          </Link>
        </main>
        <section className={styles.part}>
          <figure>
            <img src={vegImage} alt="Fresh organic green vegetables" />
            <figcaption>Fresh organic vegetables grown locally.</figcaption>
          </figure>

          <figure>
            <img src={multiVegImage} alt="A variety of organic produce" />
            <figcaption>
              A colorful variety of organic produce from our farms.
              <br />
              <b>Central California</b> — The person who grew these was located
              in Central California and, er, hopefully very well-compensated.
            </figcaption>
          </figure>
        </section>
      </section>
      <section
        className={`${styles.section} ${styles.blue}`}
        ref={(el) => {
          if (el && !sectionRef.current.includes(el)) {
            sectionRef.current.push(el);
          }
        }}
      >
        <p>This is test 3</p>
      </section>
      <section
        className={`${styles.section} ${styles.yellow}`}
        ref={(el) => {
          if (el && !sectionRef.current.includes(el)) {
            sectionRef.current.push(el);
          }
        }}
      >
        <p>This is a test</p>
      </section>
    </div>
  );
}
