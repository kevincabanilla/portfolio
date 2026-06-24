export interface SkillsInfo {
  development: DevelopmentSkills;
  others: OtherSkills;
}

export interface DevelopmentSkills {
  languages: SkillArea;
  frontend: SkillArea;
  backend: SkillArea;
  cloud: SkillArea;
  tools: SkillArea;
  ai_agents: SkillArea;
  game_development: SkillArea;
}

export interface OtherSkills {
  core_fundamentals: SkillArea;
  soft_skills: SkillArea;
  areas_of_interest: SkillArea;
}

export interface SkillArea {
  label: string;
  items: SkillItem[];
}

export interface SkillItem {
  text: string;
  icon: string;
}
