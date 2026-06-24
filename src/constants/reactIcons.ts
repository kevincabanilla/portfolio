import {
  FaReact,
  FaAngular,
  FaVuejs,
  FaBootstrap,
  FaJava,
  FaAws,
  FaDocker,
  FaGitAlt,
  // FaNpm,
  FaFigma,
  FaHashtag,
  FaRobot,
} from "react-icons/fa6";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiNextdotjs,
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
  TbGitMerge,
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
import { MdOutlineOfflineBolt } from "react-icons/md";
import { AiFillOpenAI } from "react-icons/ai";
import { TbCodeCircle, TbBrandFramerMotion } from "react-icons/tb";
import { LuBrainCircuit } from "react-icons/lu";
import type { IconType } from "react-icons";

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
  FaReact,
  FaAngular,
  FaVuejs,
  SiNextdotjs,
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
  FaAws,
  SiFirebase,
  FaDocker,
  SiGithubactions,
  TbGitMerge,

  // Tools
  VscVscode,
  FaGitAlt,
  SiNpm,
  SiPostman,
  SiInsomnia,
  MdOutlineOfflineBolt,
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
