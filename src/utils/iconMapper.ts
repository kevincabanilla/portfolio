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
import { MdBusiness, MdOutlineEmail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";

export type IconMap = Record<
  string,
  ComponentType<{ size?: number | string; className?: string }>
>;

export const ICON_MAP: IconMap = {
  LinkedIn: FaLinkedin,
  GitHub: FaGithub,
  Instagram: FaInstagram,
  Twitter: SiX,
  React: FaReact,
  EmailAddress: MdOutlineEmail,
  MobilePhone: IoCallOutline,
  Python: FaPython,
  HiAnnotation,
  MdBusiness,
  FaCode,
};
