"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "@/context/LanguageContext";
import { Language } from "@/locales/translations";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const { t, language, changeLanguage } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Sticky header toggler on scroll
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
          // Add custom background in scrolled state
          (navbar as HTMLElement).style.background = "rgba(5, 5, 5, 0.75)";
          (navbar as HTMLElement).style.backdropFilter = "blur(15px)";
          (navbar as HTMLElement).style.borderBottom = "1px solid rgba(255, 255, 255, 0.06)";
          (navbar as HTMLElement).style.padding = "0.8rem 5%";
        } else {
          navbar.classList.remove("scrolled");
          (navbar as HTMLElement).style.background = "transparent";
          (navbar as HTMLElement).style.backdropFilter = "none";
          (navbar as HTMLElement).style.borderBottom = "none";
          (navbar as HTMLElement).style.padding = "1.2rem 5%";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver to trace active section in viewport
  useEffect(() => {
    const sections = ["home", "about", "experience", "projects", "media", "contact"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Triggers when section occupies central viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { href: "#home", labelKey: "nav-home" as const },
    { href: "#about", labelKey: "nav-about" as const },
    { href: "#experience", labelKey: "nav-experience" as const },
    { href: "#projects", labelKey: "nav-projects" as const },
    { href: "#media", labelKey: "nav-media" as const },
    { href: "#contact", labelKey: "nav-contact" as const },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const flags: Record<Language, { code: string; label: string }> = {
    uz: { code: "uz", label: "UZ" },
    en: { code: "us", label: "EN" },
    ru: { code: "ru", label: "RU" },
  };

  return (
    <nav className="navbar" style={{ transition: "all 0.4s ease" }}>
      <div className="logo-container">
        <Image
          src="/profile.png"
          alt="Ozodbek Salohiddinov"
          width={40}
          height={40}
          className="nav-logo"
          style={{ borderRadius: "50%", objectFit: "cover", objectPosition: "center 20%", border: "1.5px solid var(--gold)" }}
          priority
        />
        <span className="logo-text">Ozodbek Salohiddinov</span>
      </div>

      <div className="nav-right">
        {/* Desktop Links */}
        <ul className="nav-links">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.href} style={{ position: "relative" }}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  style={{
                    color: isActive ? "var(--gold)" : "var(--text-secondary)",
                    textShadow: isActive ? "0 0 10px rgba(255, 215, 0, 0.4)" : "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  {t(link.labelKey)}
                </a>
                {isActive && (
                  <motion.div
                    layoutId="activeGlow"
                    style={{
                      position: "absolute",
                      bottom: "-8px",
                      left: "0",
                      width: "100%",
                      height: "2px",
                      background: "var(--gold)",
                      boxShadow: "0 0 8px var(--gold), 0 0 15px var(--gold)",
                      borderRadius: "2px",
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Language Selector */}
        <div className="lang-selector">
          <button
            className="lang-btn"
            onClick={(e) => {
              e.stopPropagation();
              setLangDropdownOpen(!langDropdownOpen);
            }}
          >
            <Image
              src={`https://flagcdn.com/w40/${flags[language].code}.png`}
              alt={flags[language].label}
              width={20}
              height={14}
              className="flag-icon"
            />
            {flags[language].label}
          </button>

          <div className={`lang-dropdown ${langDropdownOpen ? "show" : ""}`}>
            {(Object.keys(flags) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  changeLanguage(lang);
                  setLangDropdownOpen(false);
                }}
              >
                <Image
                  src={`https://flagcdn.com/w40/${flags[lang].code}.png`}
                  alt={flags[lang].label}
                  width={20}
                  height={14}
                  className="flag-icon"
                  style={{ marginRight: "6px" }}
                />
                {lang === "uz" ? "O'zbekcha" : lang === "en" ? "English" : "Русский"}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="hamburger-btn"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu block */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu"
          >
            <ul>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      style={{
                        color: isActive ? "var(--gold)" : "var(--text-secondary)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {t(link.labelKey)}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global click handler to close dropdown */}
      {langDropdownOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 1000 }}
          onClick={() => setLangDropdownOpen(false)}
        />
      )}

      {/* Custom CSS overrides for responsiveness */}
      <style jsx>{`
        .hamburger-btn {
          display: none;
          background: transparent;
          border: none;
          color: #fff;
          cursor: pointer;
          margin-left: 1.5rem;
          padding: 0.5rem;
          align-items: center;
          justify-content: center;
          transition: color 0.3s ease;
        }

        .hamburger-btn:hover {
          color: var(--gold);
        }

        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: #050505;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 1.5rem 5%;
          z-index: 999;
        }

        .mobile-menu ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .mobile-menu a {
          color: var(--text-secondary);
          font-weight: bold;
          font-size: 0.9rem;
          text-transform: uppercase;
          text-decoration: none;
          display: block;
          letter-spacing: 1px;
          transition: color 0.3s ease;
        }

        .mobile-menu a:hover {
          color: var(--gold);
        }

        @media (max-width: 768px) {
          nav :global(.nav-links) {
            display: none !important;
          }
          .hamburger-btn {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
};
export default Navbar;
