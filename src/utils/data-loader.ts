import type { ContactInfo, PersonalInfo } from "@/models";

import personalData from "../../data/personal.json";
// import educationData from "../../data/education.json";
// import experienceData from "../../data/experience.json";
// import skillsData from "../../data/skills.json";
// import projectsData from "../../data/projects.json";
import contactData from "../../data/contact.json";

export const getPersonalData = (): PersonalInfo => personalData;
export const getContactData = (): ContactInfo => contactData;
