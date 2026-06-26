"use client";

import React, { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error";
}

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>({ show: false, message: "", type: "success" });

  const contactCards = [
    {
      href: "mailto:salohiddinovozodbek205@gmail.com",
      iconClass: "fa-regular fa-envelope",
      title: "Email",
      value: "salohiddinovozodbek205@gmail.com",
    },
    {
      href: "https://www.linkedin.com/in/ozodbek-salohiddinov-67aa513b9",
      iconClass: "fa-brands fa-linkedin-in",
      title: "LinkedIn",
      value: "/in/ozodbek-salohiddinov",
    },
    {
      href: "https://t.me/neyrophot0",
      iconClass: "fa-regular fa-paper-plane",
      title: "Telegram",
      value: "@neyrophot0",
    },
    {
      href: "tel:+998500887007",
      iconClass: "fa-solid fa-phone",
      title: "Telefon",
      value: "+998 50 088 70 07",
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        showToast(
          t("form-submit") === "Xabar yuborish"
            ? "Xabaringiz muvaffaqiyatli yuborildi! Rahmat."
            : t("form-submit") === "Send message"
            ? "Your message has been sent! Thank you."
            : "Ваше сообщение отправлено! Спасибо.",
          "success"
        );
        form.reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Form error:", error);
      showToast(
        t("form-submit") === "Xabar yuborish"
          ? "Tarmoq xatosi. Iltimos, Telegram yoki Email orqali bog'laning!"
          : t("form-submit") === "Send message"
          ? "Network error. Please contact via Telegram or Email!"
          : "Ошибка сети. Свяжитесь через Telegram или Email!",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 5000);
  };

  return (
    <section id="contact" className="contact hidden">
      <div className="contact-split-container">
        {/* Left side: Info and Cards */}
        <div className="contact-left">
          <span className="contact-badge">{t("contact-badge")}</span>
          
          <h2 className="contact-heading">
            {t("contact-heading") === "Keling,<br>bog'lanaylik" ? (
              <>
                Keling,<br />bog&apos;lanaylik
              </>
            ) : t("contact-heading") === "Let's<br>Connect" ? (
              <>
                Let&apos;s<br />Connect
              </>
            ) : (
              <>
                Давайте<br />свяжемся
              </>
            )}
          </h2>
          
          <p className="contact-subheading">
            {t("contact-subheading")}
          </p>

          <div className="contact-cards">
            {contactCards.map((card, idx) => {
              return (
                <a
                  key={idx}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="contact-card"
                >
                  <div className="card-icon">
                    <i className={card.iconClass}></i>
                  </div>
                  <div className="card-info">
                    <h3>{card.title}</h3>
                    <p>{card.value}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Right side: Form */}
        <div className="contact-right">
          <div className="form-container">
            <h3>{t("form-title")}</h3>
            
            <form
              action="https://formsubmit.co/salohiddinovozodbek205@gmail.com"
              method="POST"
              onSubmit={handleSubmit}
            >
              {/* FormSubmit Settings */}
              <input type="hidden" name="_subject" value="Yangi xabar: CV Resume" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div className="form-group">
                <label>{t("form-name-label")}</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={t("form-name-ph")}
                />
              </div>

              <div className="form-group">
                <label>{t("form-email-label")}</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={t("form-email-ph")}
                />
              </div>

              <div className="form-group">
                <label>{t("form-msg-label")}</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder={t("form-msg-ph")}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="submit-btn"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 spinner" />
                    <span>
                      {t("form-submit") === "Xabar yuborish"
                        ? "Yuborilmoqda..."
                        : t("form-submit") === "Send message"
                        ? "Sending..."
                        : "Отправка..."}
                    </span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane" style={{ marginRight: "6px" }}></i>
                    <span>{t("form-submit")}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-8 right-8 z-[10000] bg-[rgba(20,20,25,0.95)] backdrop-blur-md border px-6 py-4 rounded-xl flex items-center gap-3 shadow-2xl pointer-events-auto select-none ${
              toast.type === "success" ? "border-green-500/30" : "border-red-500/30"
            }`}
            style={{
              position: "fixed",
              bottom: "2rem",
              right: "2rem",
              zIndex: 9999,
            }}
          >
            {toast.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-green-500 drop-shadow-[0_0_5px_rgba(76,175,80,0.4)]" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-500 drop-shadow-[0_0_5px_rgba(244,67,54,0.4)]" />
            )}
            <span className="text-white text-sm font-semibold">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default Contact;
