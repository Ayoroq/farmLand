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
    const NavbarHeight = Navbar.offsetHeight;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: homeRef.current,
        start: `top ${NavbarHeight}px`,
        end: '+=' + ((sectionRef.current.length - 1) * 100) + "%",
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
        duration: 2,
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
        <p>Testing again</p>
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
