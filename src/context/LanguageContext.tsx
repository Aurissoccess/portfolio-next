"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language, TranslationType } from "../locales/translations";

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: keyof TranslationType) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("uz");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read saved language from localStorage on client mount
    const savedLang = localStorage.getItem("preferredLanguage") as Language;
    if (savedLang && (savedLang === "uz" || savedLang === "en" || savedLang === "ru")) {
      setLanguage(savedLang);
    }
    setMounted(true);
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("preferredLanguage", lang);
  };

  const t = (key: keyof TranslationType): string => {
    return translations[language][key] || translations["uz"][key] || "";
  };

  // Prevent flash or mismatch during SSR by waiting for client mount
  // Return a layout with default language "uz" while loading
  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
};
