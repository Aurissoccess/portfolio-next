"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { TranslationType } from "@/locales/translations";
import { Play } from "lucide-react";

interface VideoItem {
  id: string;
  src: string;
  titleKey: keyof TranslationType;
  aspect: "vertical" | "horizontal";
}

const GalleryVideo: React.FC<{ video: VideoItem; t: any }> = ({ video, t }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handlePlay = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const currentVideo = e.currentTarget;
    const allVideos = document.querySelectorAll("video");
    allVideos.forEach((vid) => {
      if (vid !== currentVideo) {
        vid.pause();
      }
    });
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className={`media-card ${video.aspect} glass-card hidden`}>
      <div className="video-wrapper">
        <video
          ref={videoRef}
          controls={isPlaying}
          preload="metadata"
          playsInline
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handlePause}
        >
          <source src={video.src} type="video/mp4" />
        </video>

        {!isPlaying && (
          <div className="play-overlay" onClick={handlePlayClick}>
            <div className="play-button-icon">
              <Play className="w-6 h-6 fill-current" style={{ marginLeft: "2px" }} />
            </div>
          </div>
        )}
      </div>

      {/* Title */}
      <span className="media-title">
        {t(video.titleKey)}
      </span>
    </div>
  );
};

export const MediaGallery: React.FC = () => {
  const { t } = useTranslation();

  const videos: VideoItem[] = [
    // Vertical videos (9:16)
    { id: "v1", src: "/videolar/saber_energy.mp4", titleKey: "media-v1", aspect: "vertical" },
    { id: "v2", src: "/videolar/esit_222.mp4", titleKey: "media-v2", aspect: "vertical" },
    { id: "v3", src: "/videolar/reallyl.mp4", titleKey: "media-v3", aspect: "vertical" },
    { id: "v4", src: "/videolar/fashion.mp4", titleKey: "media-v4", aspect: "vertical" },
    { id: "v5", src: "/videolar/7_carbon_old.mp4", titleKey: "media-v5", aspect: "vertical" },
    { id: "v6", src: "/videolar/azamat_333.mp4", titleKey: "media-v6", aspect: "vertical" },
    { id: "v7", src: "/videolar/azamat_somatov.mp4", titleKey: "media-v7", aspect: "vertical" },
    { id: "v8", src: "/videolar/dilmuss_22.mp4", titleKey: "media-v8", aspect: "vertical" },
    { id: "v9", src: "/videolar/huga_style_cut_short_version.mp4", titleKey: "media-v9", aspect: "vertical" },
    { id: "v10", src: "/videolar/muslim_short_versin_on.mp4", titleKey: "media-v10", aspect: "vertical" },
    { id: "v11", src: "/videolar/hf_20260423_180017_98690f41_47ea_4a32_bb7c_6fd2726ff142.mp4", titleKey: "media-v11", aspect: "vertical" },
    { id: "v12", src: "/videolar/tom_and_jerry_storyboard.mp4", titleKey: "media-v12", aspect: "vertical" },
    // Horizontal videos (16:9)
    { id: "v13", src: "/videolar/manashuni_joyla.mp4", titleKey: "media-v13", aspect: "horizontal" },
    { id: "v14", src: "/videolar/mahmudjon_inomjonov_jason_statham.mp4", titleKey: "media-v14", aspect: "horizontal" },
    { id: "v15", src: "/videolar/mersedes_benz.mp4", titleKey: "media-v15", aspect: "horizontal" },
    { id: "v16", src: "/videolar/sahro.mp4", titleKey: "media-v16", aspect: "horizontal" },
    { id: "v17", src: "/videolar/adrenaline_ads.mp4", titleKey: "media-v17", aspect: "horizontal" },
    { id: "v18", src: "/videolar/estetik.mp4", titleKey: "media-v18", aspect: "horizontal" },
    { id: "v19", src: "/videolar/img_5063.mp4", titleKey: "media-v19", aspect: "horizontal" },
    { id: "v20", src: "/videolar/img_5064.mp4", titleKey: "media-v20", aspect: "horizontal" },
    { id: "v21", src: "/videolar/hf_20260403_153858_757f5c5c_55f1_45a9_bee5_7f674b8ac18a.mp4", titleKey: "media-v21", aspect: "horizontal" },
    { id: "v22", src: "/videolar/hf_20260430_065835_72779252_d08a_4490_b426_cd472adbf083_1.mp4", titleKey: "media-v22", aspect: "horizontal" },
  ];

  // Self-contained IntersectionObserver to handle scroll reveals & tab changes
  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: "0px", threshold: 0.1 });

    const hiddenCards = document.querySelectorAll(".media-card.hidden");
    hiddenCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="media" className="media hidden">
      <h2
        className="section-title"
        dangerouslySetInnerHTML={{ __html: t("media-title") }}
      />

      {/* Video Cards Grid */}
      <div className="media-grid">
        {videos.map((video) => (
          <GalleryVideo key={video.id} video={video} t={t} />
        ))}
      </div>
    </section>
  );
};

export default MediaGallery;
