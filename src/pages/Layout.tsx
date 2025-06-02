
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);

    // Add intersection observer for animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (mainRef.current) {
      const animatedElements = mainRef.current.querySelectorAll(".animated-element");
      animatedElements.forEach((el) => {
        observer.observe(el);
      });
    }

    return () => {
      if (mainRef.current) {
        const animatedElements = mainRef.current.querySelectorAll(".animated-element");
        animatedElements.forEach((el) => {
          observer.unobserve(el);
        });
      }
    };
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main
        ref={mainRef}
        className="flex-grow pt-[var(--navbar-height,76px)]"
        style={{
          scrollMarginTop: 'var(--navbar-height, 76px)'
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
