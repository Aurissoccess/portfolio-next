"use client";

import React, { useEffect, useRef } from "react";

export const InteractiveBackground: React.FC = () => {
  const bgGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    const handleScroll = () => {
      if (bgGlowRef.current) {
        if (window.scrollY > window.innerHeight * 0.3) {
          bgGlowRef.current.style.opacity = "1";
        } else {
          bgGlowRef.current.style.opacity = "0";
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    // Intersection Observer for hardware-accelerated CSS reveals
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          if (entry.target.id === "about") {
            const imgContainer = document.querySelector(".about-image-container");
            if (imgContainer) {
              imgContainer.classList.add("show-image");
            }
          }
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Small delay to ensure React DOM is mounted before querying
    const timeoutId = setTimeout(() => {
      const hiddenElements = document.querySelectorAll(".hidden");
      hiddenElements.forEach((el) => observer.observe(el));
    }, 150);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  return <div ref={bgGlowRef} id="bg-glow" />;
};

export default InteractiveBackground;
