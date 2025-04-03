
export interface Account {
  _id: string;
  linkedin_username: string;
  linkedin_password: string;
  profile_url: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface NewAccount {
  linkedin_username: string;
  linkedin_password: string;
  profile_url: string;
}
