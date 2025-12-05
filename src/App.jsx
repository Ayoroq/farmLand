import { Outlet, useLocation } from "react-router";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import style from "./App.module.css";
import { BasketContext } from "./context/BasketContext.jsx";
import BasketProvider from "./context/BasketContext.jsx";
import { gsap } from "gsap";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";

export default function App() {
  const lenisRef = useRef();
  const location = useLocation();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      <div className={style.app}>
        <BasketProvider>
          <Navbar />
          <Outlet />
          <Footer />
        </BasketProvider>
      </div>
    </ReactLenis>
  );
}
