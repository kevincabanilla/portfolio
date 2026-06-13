import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaReact,
  FaPython,
  FaCode,
} from "react-icons/fa6";
import { SiX } from "react-icons/si";
import type { ComponentType } from "react";
import { HiAnnotation } from "react-icons/hi";
import { MdBusiness } from "react-icons/md";

export type IconMap = Record<string, ComponentType<{ size?: number | string }>>;

export const ICON_MAP: IconMap = {
  LinkedIn: FaLinkedin,
  GitHub: FaGithub,
  Instagram: FaInstagram,
  Twitter: SiX,
  React: FaReact,
  Python: FaPython,
  HiAnnotation: HiAnnotation,
  MdBusiness: MdBusiness,
  FaCode: FaCode,
};
