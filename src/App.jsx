import { Outlet } from "react-router";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import style from "./App.module.css";
import { BasketContext } from "./context/BasketContext.jsx";
import { gsap } from "gsap";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";

export default function App() {
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      <div className={style.app}>
        <BasketContext.Provider value={{ items: [] }}>
          <Navbar />
          <Outlet />
          <Footer />
        </BasketContext.Provider>
      </div>
    </ReactLenis>
  );
}
