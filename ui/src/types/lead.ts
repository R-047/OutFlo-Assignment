
export interface Lead {
  _id: string;
  name: string;
  job_title: string;
  company: string;
  location: string;
  linkedin_url: string;
  summary?: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface NewLead {
  name: string;
  job_title: string;
  company: string;
  location: string;
  linkedin_url: string;
  summary?: string;
}
