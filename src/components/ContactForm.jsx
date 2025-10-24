// src/components/ContactForm.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { ArrowRight } from "lucide-react";

/* ---- CONFIG (conserve tes valeurs) ---- */
const SERVICE_ID = "service_6cf76v6";
const TEMPLATE_ID = "template_q4bpc55";
const PUBLIC_KEY = "PK08odrm9FTDnLwaf";

/* Labels par défaut si la prop `t` n'est pas fournie */
const defaultT = {
  contact: {
    form: {
      name: "Nom",
      namePlaceholder: "Votre nom",
      email: "Email",
      emailPlaceholder: "votre@mail.com",
      phone: "Téléphone",
      phonePlaceholder: "Votre numéro",
      projectType: "Type de projet",
      projectTypePlaceholder: "Sélectionner un type",
      projectTypes: {
        web: "Site web",
        mobile: "Application mobile",
        ecommerce: "E-commerce",
        design: "Design",
        other: "Autre",
      },
      budget: "Budget",
      budgetPlaceholder: "Sélectionner un budget",
      budgets: {
        small: "Petit",
        medium: "Moyen",
        large: "Grand",
        xlarge: "Très grand",
      },
      message: "Message",
      messagePlaceholder: "Parlez-nous de votre projet...",
      success: "Message envoyé — merci !",
      error: "Une erreur est survenue, réessayez.",
      sending: "Envoi...",
      submit: "Envoyer",
    },
  },
};

export default function ContactForm({ t }) {
  const trans = t ?? defaultT;
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const projectFromURL = params.get("project") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: projectFromURL
      ? `Je suis intéressé par un projet similaire à : ${projectFromURL}`
      : "",
    honeypot: "",
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const e = {};
    if (!formData.name || formData.name.trim().length < 2)
      e.name = "Nom (min 2 caractères).";
    if (
      !formData.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      e.email = "Email invalide.";
    if (!formData.projectType) e.projectType = "Sélectionner le type de projet.";
    if (!formData.budget) e.budget = "Sélectionner un budget.";
    if (!formData.message || formData.message.trim().length < 20)
      e.message = "Message trop court (min 20).";
    if (formData.honeypot && formData.honeypot.trim() !== "")
      e.honeypot = "Spam détecté.";
    setErrors(e);
  }, [formData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  }

  function handleBlur(e) {
    setTouched((s) => ({ ...s, [e.target.name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      projectType: true,
      budget: true,
      message: true,
      honeypot: true,
    });

    if (formData.honeypot) {
      console.log("Spam détecté (honeypot).");
      return;
    }

    if (!formData.name || !formData.email || !formData.projectType || !formData.budget || !formData.message) {
      setStatus("error");
      return;
    }

    if (Object.keys(errors).length > 0) {
      setStatus("error");
      return;
    }

    try {
      setStatus("sending");

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || "Non renseigné",
        project_type: formData.projectType,
        budget: formData.budget,
        message: formData.message,
        to_email: "intellopjsn@gmail.com"
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      try {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag('event', 'generate_lead', {
            event_category: 'Contact',
            event_label: formData.projectType || 'contact_form',
            value: 1
          });
        }
      } catch (err) {
        console.warn("GA tracking error:", err);
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        budget: "",
        message: "",
        honeypot: ""
      });
      setTouched({});
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Erreur EmailJS:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  const showError = (field) => touched[field] && errors[field];

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Honeypot */}
      <input
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        style={{ position: "absolute", left: "-5000px", opacity: 0 }}
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
        aria-label="Ne pas remplir ce champ"
      />

      <div>
        <label htmlFor="name-field" className="block text-sm font-medium text-gray-300 mb-2">
          {trans.contact.form.name} *
        </label>
        <input
          id="name-field"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 bg-black/50 border rounded-xl ${showError("name") ? "border-red-500" : "border-gray-700"}`}
          placeholder={trans.contact.form.namePlaceholder}
          required
          aria-required="true"
          aria-invalid={showError("name") ? "true" : "false"}
          aria-describedby={showError("name") ? "name-error" : undefined}
        />
        {showError("name") && <p id="name-error" role="alert" className="mt-2 text-xs text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email-field" className="block text-sm font-medium text-gray-300 mb-2">
          {trans.contact.form.email} *
        </label>
        <input
          id="email-field"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 bg-black/50 border rounded-xl ${showError("email") ? "border-red-500" : "border-gray-700"}`}
          placeholder={trans.contact.form.emailPlaceholder}
          required
          aria-required="true"
          aria-invalid={showError("email") ? "true" : "false"}
          aria-describedby={showError("email") ? "email-error" : undefined}
        />
        {showError("email") && <p id="email-error" role="alert" className="mt-2 text-xs text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone-field" className="block text-sm font-medium text-gray-300 mb-2">
          {trans.contact.form.phone}
        </label>
        <input
          id="phone-field"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl"
          placeholder={trans.contact.form.phonePlaceholder}
          aria-required="false"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="project-type-field" className="block text-sm font-medium text-gray-300 mb-2">
            {trans.contact.form.projectType} *
          </label>
          <select
            id="project-type-field"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 bg-black/50 border rounded-xl ${showError("projectType") ? "border-red-500" : "border-gray-700"}`}
            required
            aria-required="true"
            aria-invalid={showError("projectType") ? "true" : "false"}
            aria-describedby={showError("projectType") ? "project-type-error" : undefined}
          >
            <option value="">{trans.contact.form.projectTypePlaceholder}</option>
            <option value="web">{trans.contact.form.projectTypes.web}</option>
            <option value="mobile">{trans.contact.form.projectTypes.mobile}</option>
            <option value="ecommerce">{trans.contact.form.projectTypes.ecommerce}</option>
            <option value="design">{trans.contact.form.projectTypes.design}</option>
            <option value="other">{trans.contact.form.projectTypes.other}</option>
          </select>
          {showError("projectType") && <p id="project-type-error" role="alert" className="mt-2 text-xs text-red-400">{errors.projectType}</p>}
        </div>

        <div>
          <label htmlFor="budget-field" className="block text-sm font-medium text-gray-300 mb-2">
            {trans.contact.form.budget} *
          </label>
          <select
            id="budget-field"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 bg-black/50 border rounded-xl ${showError("budget") ? "border-red-500" : "border-gray-700"}`}
            required
            aria-required="true"
            aria-invalid={showError("budget") ? "true" : "false"}
            aria-describedby={showError("budget") ? "budget-error" : undefined}
          >
            <option value="">{trans.contact.form.budgetPlaceholder}</option>
            <option value="small">{trans.contact.form.budgets.small}</option>
            <option value="medium">{trans.contact.form.budgets.medium}</option>
            <option value="large">{trans.contact.form.budgets.large}</option>
            <option value="xlarge">{trans.contact.form.budgets.xlarge}</option>
          </select>
          {showError("budget") && <p id="budget-error" role="alert" className="mt-2 text-xs text-red-400">{errors.budget}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message-field" className="block text-sm font-medium text-gray-300 mb-2">
          {trans.contact.form.message} *
        </label>
        <textarea
          id="message-field"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          rows="5"
          className={`w-full px-4 py-3 bg-black/50 border rounded-xl resize-none ${showError("message") ? "border-red-500" : "border-gray-700"}`}
          placeholder={trans.contact.form.messagePlaceholder}
          required
          aria-required="true"
          aria-invalid={showError("message") ? "true" : "false"}
          aria-describedby={showError("message") ? "message-error" : undefined}
        />
        {showError("message") && <p id="message-error" role="alert" className="mt-2 text-xs text-red-400">{errors.message}</p>}
      </div>

      <div aria-live="polite" aria-atomic="true">
        {status === "success" && (
          <div role="alert" className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400">
            {trans.contact.form.success}
          </div>
        )}

        {status === "error" && (
          <div role="alert" className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
            {trans.contact.form.error}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        aria-busy={status === "sending"}
      >
        {status === "sending" ? trans.contact.form.sending : trans.contact.form.submit}
        {status !== "sending" && <ArrowRight className="w-5 h-5" aria-hidden="true" />}
      </button>
    </form>
  );
}