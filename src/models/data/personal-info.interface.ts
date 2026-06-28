export interface PersonalInfo {
  fullName: string;
  title: string;
  roles: string[];
  about: AboutInfo;
  languages: Language[];
  socialProfiles: SocialProfile[];
  currentTechs: string[];
  resumeUrl: string;
  site: SiteConfig;
}

export interface AboutInfo {
  greeting: string;
  status: string;
  favoriteQuote: FavoriteQuote;
  highlights: HighlightItem[];
}

export interface FavoriteQuote {
  phrase: string;
  personName: string;
}

export interface HighlightItem {
  text: string;
  icon: string;
  color: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface SocialProfile {
  id: number;
  name: string;
  link: string;
  icon: string;
}

export interface SiteConfig {
  techStacks: string[];
}
