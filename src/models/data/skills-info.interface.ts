export interface SkillsInfo {
  development: SkillArea[];
  others: SkillArea[];
}

export interface SkillArea {
  label: string;
  items: SkillItem[];
}

export interface SkillItem {
  text: string;
  icon: string;
  svg: string;
}
