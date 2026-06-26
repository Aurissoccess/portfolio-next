"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

export const Experience: React.FC = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const timelineItems = [
    {
      titleKey: "exp-1-title" as const,
      subKey: "exp-1-sub" as const,
      dateKey: "exp-1-date" as const,
      descKey: "exp-1-desc" as const,
      insta: "https://www.instagram.com/gen_ai_office.uz",
    },
    {
      titleKey: "exp-2-title" as const,
      subKey: "exp-2-sub" as const,
      dateKey: "exp-2-date" as const,
      descKey: "exp-2-desc" as const,
      insta: "https://www.instagram.com/mahmudjon_inomjonov",
    },
    {
      titleKey: "exp-4-title" as const,
      subKey: "exp-4-sub" as const,
      dateKey: "exp-4-date" as const,
      descKey: "exp-4-desc" as const,
      insta: null,
    },
    {
      titleKey: "exp-3-title" as const,
      subKey: "exp-3-sub" as const,
      dateKey: "exp-3-date" as const,
      descKey: "exp-3-desc" as const,
      insta: null,
    },
  ];

  const certificates = [
    {
      image: "/sertifikat.jpg",
      titleKey: "cert-1-title" as const,
      issuerKey: "cert-1-issuer" as const,
      dateKey: "cert-1-date" as const,
    },
    {
      image: "/tashakkurnoma.jpg",
      titleKey: "cert-2-title" as const,
      issuerKey: "cert-2-issuer" as const,
      dateKey: "cert-2-date" as const,
    },
  ];

  return (
    <section id="experience" className="experience hidden">
      <h2
        className="section-title"
        dangerouslySetInnerHTML={{ __html: t("exp-title") }}
      />

      {/* Experience Timeline */}
      <div className="timeline">
        {timelineItems.map((item, index) => (
          <div
            key={index}
            className="timeline-item glass-card hidden"
          >
            <div className="timeline-dot"></div>
            <h3>{t(item.titleKey)}</h3>
            <h4>
              <span>{t(item.subKey)}</span>
              {item.insta && (
                <a
                  href={item.insta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="timeline-insta-link"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
              )}
            </h4>
            <p className="timeline-date">{t(item.dateKey)}</p>
            <p>{t(item.descKey)}</p>
          </div>
        ))}
      </div>

      {/* Certificates and Acknowledgements */}
      <div className="certificates-section mt-10">
        <div className="certificates-header">
          <span className="contact-badge">{t("cert-badge")}</span>
          <h2 className="certificates-title">{t("cert-title")}</h2>
          <p className="certificates-subtitle">{t("cert-subtitle")}</p>
        </div>

        <div className="certificates-grid">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="cert-card glass-card hidden"
              onClick={() => setSelectedImage(cert.image)}
              style={{ cursor: "pointer" }}
            >
              <div className="cert-image-wrapper">
                <Image
                  src={cert.image}
                  alt="Certificate"
                  width={340}
                  height={320}
                  className="cert-image"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="cert-content">
                <h3>{t(cert.titleKey)}</h3>
                <div className="cert-footer">
                  <span className="cert-issuer">{t(cert.issuerKey)}</span>
                  <span className="cert-date gold-text">{t(cert.dateKey)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10000,
              padding: "1rem",
            }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "none",
                padding: "0.6rem",
                borderRadius: "50%",
                cursor: "pointer",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10001,
                transition: "background-color 0.2s",
              }}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "950px",
                height: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Certificate full view"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default Experience;
