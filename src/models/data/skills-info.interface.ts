export interface SkillsInfo {
  development: DevelopmentSkills;
  others: OtherSkills;
}

export interface DevelopmentSkills {
  languages: string[];
  frontend: string[];
  backend: string[];
  cloud: string[];
  tools: string[];
  ai_agents: string[];
  game_development: string[];
}

export interface OtherSkills {
  core_fundamentals: string[];
  soft_skills: string[];
  areas_of_interest: string[];
}
