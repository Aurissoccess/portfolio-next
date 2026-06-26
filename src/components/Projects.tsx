"use client";

import React from "react";
import { useTranslation } from "@/context/LanguageContext";

export const Projects: React.FC = () => {
  const { t } = useTranslation();

  const projectsList = [
    { name: "Bilim.ly", url: "https://www.instagram.com/bilim.ly" },
    { name: "AI Mamasha", url: "https://www.instagram.com/ai.mamasha" },
    { name: "Smart World Uz", url: "https://www.instagram.com/smartworlduz" },
    { name: "Saber Energy", url: "https://www.instagram.com/saberenergy" },
    { name: "Temur Khatamov", url: "https://www.instagram.com/temurkhatamov" },
    { name: "Gigant Buxgalter Uz", url: "https://www.instagram.com/gigant_buxgalter_uz" },
    { name: "Mutolaa", url: "https://www.instagram.com/mutolaaxona?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { name: "Tuzuk AI", url: "https://www.instagram.com/tuzuk_ai?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { name: "Reveo AI", url: "https://www.instagram.com/reveoai?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  ];

  return (
    <section id="projects" className="projects hidden">
      <h2
        className="section-title"
        dangerouslySetInnerHTML={{ __html: t("proj-title") }}
      />

      <div className="projects-grid">
        {projectsList.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card glass-card hidden"
          >
            <i className="fa-brands fa-instagram gold-text"></i>
            <h3>{project.name}</h3>
            <p>{t("proj-desc")}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
