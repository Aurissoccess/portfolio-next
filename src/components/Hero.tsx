"use client";

import React, { useEffect, useRef } from "react";
import { useTranslation } from "@/context/LanguageContext";

export const Hero: React.FC = () => {
  const { t, language } = useTranslation();
  const goldDustRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLHeadingElement>(null);
  const profileBoxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Typewriter welcome text (Direct DOM updates to prevent component re-render loops)
  useEffect(() => {
    const text = t("welcome");
    const welcomeEl = welcomeRef.current;
    if (!welcomeEl) return;

    welcomeEl.innerText = "";
    
    // Reset profile box visibility before typing starts
    if (profileBoxRef.current) {
      profileBoxRef.current.style.opacity = "0";
      profileBoxRef.current.style.transform = "translateY(20px)";
      profileBoxRef.current.style.transition = "none"; // Reset transitions
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        welcomeEl.append(text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        // Smoothly fade/slide in profile box once typing is finished
        if (profileBoxRef.current) {
          profileBoxRef.current.style.transition = "opacity 1s ease, transform 1s ease";
          profileBoxRef.current.style.opacity = "1";
          profileBoxRef.current.style.transform = "translateY(0)";
        }
      }
    }, 60);

    return () => clearInterval(interval);
  }, [language, t]);

  // CSS Keyframe Gold Dust Particles (Aquarium Flow)
  useEffect(() => {
    const container = goldDustRef.current;
    if (!container) return;

    container.innerHTML = "";
    const activeParticles: HTMLDivElement[] = [];

    const createParticle = () => {
      const particle = document.createElement("div");
      particle.classList.add("gold-particle");

      const size = Math.random() * 5 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      particle.style.setProperty("--dx1", `${Math.random() * 40 - 20}px`);
      particle.style.setProperty("--dy1", `${-(Math.random() * 30 + 10)}px`);
      particle.style.setProperty("--dx2", `${Math.random() * 80 - 40}px`);
      particle.style.setProperty("--dy2", `${-(Math.random() * 60 + 30)}px`);
      particle.style.setProperty("--dx3", `${Math.random() * 120 - 60}px`);
      particle.style.setProperty("--dy3", `${-(Math.random() * 100 + 60)}px`);

      const duration = Math.random() * 10 + 6;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;

      container.appendChild(particle);
      activeParticles.push(particle);

      const timeoutId = setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
        const idx = activeParticles.indexOf(particle);
        if (idx > -1) {
          activeParticles.splice(idx, 1);
        }
        createParticle();
      }, (duration + 5) * 1000);

      (particle as any)._timeoutId = timeoutId;
    };

    for (let i = 0; i < 50; i++) {
      createParticle();
    }

    return () => {
      activeParticles.forEach((p) => {
        if (p.parentNode) p.parentNode.removeChild(p);
        if ((p as any)._timeoutId) clearTimeout((p as any)._timeoutId);
      });
    };
  }, []);

  const handleScrollClick = () => {
    const target = document.querySelector("#about");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const socialLinks = [
    { href: "https://www.instagram.com/ai_salokhiddinov", icon: "fa-brands fa-instagram", title: "Instagram" },
    { href: "https://t.me/Salohiddinovblog_0", icon: "fa-brands fa-telegram", title: "Telegram" },
    { href: "https://www.linkedin.com/in/ozodbek-salohiddinov-67aa513b9", icon: "fa-brands fa-linkedin-in", title: "LinkedIn" },
    { href: "https://www.facebook.com/share/19JQNEyBKS/", icon: "fa-brands fa-facebook-f", title: "Facebook" },
    { href: "https://youtube.com/@salohiddinovozodbek?si=JY85DjKA9XyRj3vN", icon: "fa-brands fa-youtube", title: "YouTube" },
  ];

  return (
    <section id="home" className="hero">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="bg-video"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay"></div>

      {/* Water Fill Overlay with Floating Gold Particles */}
      <div className="water-fill-overlay">
        <div ref={goldDustRef} className="gold-dust-container" id="goldDust" />
      </div>

      {/* Main Content */}
      <div className="hero-content">
        <h1 ref={welcomeRef} className="welcome-text"></h1>

        <div
          ref={profileBoxRef}
          className="hero-profile-box"
          style={{ opacity: 0 }}
        >
          <h2 className="hero-name">{t("hero-name")}</h2>
          <h3 className="hero-title">{t("title")}</h3>
        </div>

        <div className="hero-socials">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-btn"
              title={social.title}
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Down Line Indicator */}
      <div className="scroll-down" onClick={handleScrollClick}>
        <span className="scroll-text">{t("scroll")}</span>
        <div className="scroll-line-container">
          <div className="scroll-line-active"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
