export interface CounterUp {
  code: string;
  data: CounterUpData;
  message: string;
}

export interface CounterUpData {
  created_at: string;
  description: string;
  down_count: number;
  id: number;
  name: string;
  slug: string;
  team_id: number;
  up_count: number;
  updated_at: string;
  user_id: number;
  workspace_id: number;
  workspace_slug: string;
}
