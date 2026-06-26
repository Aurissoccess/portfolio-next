"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "@/context/LanguageContext";

export const About: React.FC = () => {
  const { t } = useTranslation();

  const socialLinks = [
    { href: "https://www.instagram.com/ai_salokhiddinov", icon: "fa-brands fa-instagram", name: "Instagram" },
    { href: "https://t.me/Salohiddinovblog_0", icon: "fa-brands fa-telegram", name: "Telegram" },
    { href: "https://www.linkedin.com/in/ozodbek-salohiddinov-67aa513b9", icon: "fa-brands fa-linkedin-in", name: "LinkedIn" },
    { href: "https://www.facebook.com/share/19JQNEyBKS/", icon: "fa-brands fa-facebook-f", name: "Facebook" },
    { href: "https://youtube.com/@salohiddinovozodbek?si=JY85DjKA9XyRj3vN", icon: "fa-brands fa-youtube", name: "YouTube" },
  ];

  return (
    <section id="about" className="about hidden">
      <h2
        className="section-title"
        dangerouslySetInnerHTML={{ __html: t("about-title") }}
      />

      <div className="about-vertical-layout">
        {/* Top: Portrait image wrapper */}
        <div className="about-image-wrapper">
          <div className="about-image-container glass-card">
            <Image
              src="/profile.png"
              alt="Ozodbek Salohiddinov"
              width={380}
              height={475}
              className="about-profile-img"
              priority
            />
          </div>
        </div>

        {/* Bottom: Bio details card */}
        <div className="about-content-card glass-card">
          {/* Name & Surname */}
          <h3 className="about-name gold-text">Ozodbek Salohiddinov</h3>

          {/* Role Tagline */}
          <div className="about-role-tag">
            <i className="fa-solid fa-briefcase gold-text"></i>
            <span>{t("about-role")}</span>
          </div>

          {/* Biography Text */}
          <div className="about-bio-text">
            <p>{t("about-p1")}</p>
            <p>{t("about-p2")}</p>
            <p>{t("about-p3")}</p>
            <p>{t("about-p4")}</p>
            <p>{t("about-p5")}</p>
          </div>

          {/* Social Channels */}
          <div className="about-socials-block">
            <h4>{t("about-channels")}</h4>
            <div className="about-social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-social-item"
                >
                  <i className={social.icon}></i>
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
