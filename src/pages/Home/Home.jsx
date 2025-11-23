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

export default function Home(){
  const containerRef = useRef([])

  useGSAP(() => {
    const navBar = document.querySelector(".navbar")
    containerRef.current.forEach((container) => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        pin: true,
        pinSpacing: false,
        markers: true
      })
  })
});

  return(
    <div className={styles.home}>
      <section className={`${styles.hero} ${styles.section} ${styles.red}`} ref={(el) => {if(el && !containerRef.current.includes(el)){containerRef.current.push(el)}}}>
      <p>Testing again</p>
      </section>
      <section className={`${styles.section} ${styles.blue}`} ref={(el) =>  {if(el && !containerRef.current.includes(el)){containerRef.current.push(el)}}}>
      <p>This is test 3</p>
      </section>
      <section className={`${styles.section} ${styles.yellow}`} ref={(el) =>  {if(el && !containerRef.current.includes(el)){containerRef.current.push(el)}}}>
      <p>This is a test</p>
      </section>
    </div>
  )
}