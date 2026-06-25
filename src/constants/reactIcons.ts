import type { IconType } from "react-icons";
import {
  FaReact,
  FaAngular,
  FaVuejs,
  FaBootstrap,
  FaJava,
  // FaAws,
  FaDocker,
  FaGitAlt,
  // FaNpm,
  FaFigma,
  FaHashtag,
  FaRobot,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa6";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  // SiNextdotjs,
  SiVite,
  SiTailwindcss,
  SiThreedotjs,
  SiMui,
  SiDotnet,
  SiFastapi,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiFirebase,
  SiGithubactions,
  SiPostman,
  SiInsomnia,
  SiGithubcopilot,
  SiGooglegemini,
  SiGodotengine,
  SiGithub,
  SiAseprite,
  SiNpm,
} from "react-icons/si";
import {
  TbDatabase,
  TbDatabaseCog,
  TbApi,
  // TbGitMerge,
  TbBinaryTree,
  TbBoxModel2,
  TbLayersIntersect,
  TbLayoutGrid,
  TbNetwork,
  TbCpu,
  TbCodeDots,
  TbPuzzle,
  TbRocket,
  TbArrowsShuffle,
  TbMessageCircle,
  TbUsers,
  TbStack2,
  TbCloudCog,
  TbDeviceGamepad2,
} from "react-icons/tb";
import { BsFiletypeSql, BsClaude } from "react-icons/bs";
import { VscAzure, VscVscode } from "react-icons/vsc";
import { AiFillOpenAI } from "react-icons/ai";
import { TbCodeCircle, TbBrandFramerMotion } from "react-icons/tb";
import { LuBrainCircuit, LuWorkflow } from "react-icons/lu";
import { RiNextjsLine } from "react-icons/ri";

export type IconName = keyof typeof reactIconMap;

export const reactIconMap: Record<string, IconType> = {
  // Languages
  SiTypescript,
  SiJavascript,
  SiPython,
  FaHashtag,
  FaJava,
  TbDatabase,

  // Frontend
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaAngular,
  FaVuejs,
  RiNextjsLine,
  SiVite,
  SiTailwindcss,
  SiThreedotjs,
  TbBrandFramerMotion,
  SiMui,
  FaBootstrap,

  // Backend
  SiDotnet,
  TbDatabaseCog,
  SiFastapi,
  TbApi,
  BsFiletypeSql,
  SiPostgresql,
  SiMysql,
  SiSqlite,

  // Cloud
  VscAzure,
  // FaAws, AWS
  SiFirebase,
  FaDocker,
  SiGithubactions,
  // TbGitMerge, CI/CD Pipelines

  // Tools
  VscVscode,
  FaGitAlt,
  SiNpm,
  SiPostman,
  SiInsomnia,
  FaFigma,

  // AI
  SiGithubcopilot,
  BsClaude,
  TbCodeCircle,
  SiGooglegemini,
  AiFillOpenAI,

  // Game Dev
  SiGodotengine,
  SiAseprite,

  // Fundamentals
  TbBinaryTree,
  TbBoxModel2,
  TbLayersIntersect,
  TbLayoutGrid,
  TbNetwork,
  LuWorkflow,
  TbCpu,
  TbCodeDots,

  // Soft Skills
  TbPuzzle,
  TbRocket,
  TbArrowsShuffle,
  TbMessageCircle,
  TbUsers,

  // Interests
  TbStack2,
  TbCloudCog,
  SiGithub,
  TbDeviceGamepad2,
  LuBrainCircuit,
  FaRobot,
};
