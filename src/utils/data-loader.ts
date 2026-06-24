import type { ContactInfo, PersonalInfo, SkillsInfo } from "@/models";

import personalData from "../../data/personal.json";
// import educationData from "../../data/education.json";
// import experienceData from "../../data/experience.json";
import skillsData from "../../data/skills.json";
// import projectsData from "../../data/projects.json";
import contactData from "../../data/contact.json";

export const getPersonalData = (): PersonalInfo => personalData;
export const getSkillsData = (): SkillsInfo => skillsData;
export const getContactData = (): ContactInfo => contactData;
export const getEmailJSConfig = () => ({
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
});
