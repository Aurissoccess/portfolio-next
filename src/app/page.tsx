import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import MediaGallery from "@/components/MediaGallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Dynamic Header */}
      <Navbar />

      {/* Main Sections */}
      <main className="w-full flex flex-col relative z-10">
        {/* Atmospheric Video Hero */}
        <Hero />

        {/* Biography Block */}
        <About />

        {/* Experience & Achievements */}
        <Experience />

        {/* Collaborations Grid */}
        <Projects />

        {/* Optimized Media Portfolio */}
        <MediaGallery />

        {/* Form Submission & Contact details */}
        <Contact />
      </main>

      {/* Corporate Info Footer */}
      <Footer />
    </>
  );
}
