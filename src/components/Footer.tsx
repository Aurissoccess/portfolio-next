"use client";

import React from "react";
import { useTranslation } from "@/context/LanguageContext";
import { ChevronUp } from "lucide-react";

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const footerLinks = [
    { href: "#about", key: "nav-about" as const },
    { href: "#experience", key: "nav-experience" as const },
    { href: "#projects", key: "nav-projects" as const },
    { href: "#media", key: "nav-media" as const },
    { href: "#contact", key: "nav-contact" as const },
  ];

  const footerSkills = [
    "footer-skill-1" as const,
    "footer-skill-2" as const,
    "footer-skill-3" as const,
    "footer-skill-4" as const,
  ];

  return (
    <footer className="main-footer">
      <div className="footer-container">
        {/* Main Footer Grid */}
        <div className="footer-grid">
          {/* Column 1: Brand details */}
          <div className="footer-col brand-col">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, "#home")}
              className="footer-logo"
            >
              <div className="logo-box">OS</div>
              <span>
                Ozodbek <b>Salohiddinov</b>
              </span>
            </a>
            <p className="footer-desc">
              {t("footer-desc")}
            </p>
            {/* Social channels */}
            <div className="footer-socials">
              <a
                href="mailto:salohiddinovozodbek205@gmail.com"
              >
                <i className="fa-solid fa-envelope"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/ozodbek-salohiddinov-67aa513b9"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a
                href="https://t.me/Salohiddinovblog_0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-telegram"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col links-col">
            <h4>{t("footer-quick-links")}</h4>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Skills list */}
          <div className="footer-col skills-col">
            <h4>{t("footer-skills")}</h4>
            <ul>
              {footerSkills.map((skillKey) => (
                <li key={skillKey}>{t(skillKey)}</li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Action */}
          <div className="footer-col contact-col">
            <h4>{t("footer-contact-title")}</h4>
            <p dangerouslySetInnerHTML={{ __html: t("footer-contact-text") }} />
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="footer-contact-btn"
            >
              {t("footer-contact-btn")} &rarr;
            </a>
          </div>
        </div>

        {/* Footer Bottom details */}
        <div className="footer-bottom">
          <p dangerouslySetInnerHTML={{ __html: t("footer-text") }} />
          
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="back-to-top"
          >
            <ChevronUp className="w-4 h-4" style={{ display: "inline-block", verticalAlign: "middle" }} />
            <span>{t("footer-back-to-top")}</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
