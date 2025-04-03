import { Account } from "./account";
import { Lead } from "./lead";

export interface Campaign {
    _id: string;
    name: string;
    description: string;
    status: 'Active' | 'Inactive' | 'Deleted';
    leads: string[];
    accounts: string[];
    created_at: string;
    updated_at: string;
    __v: number;
}

export interface NewCampaign {
    name: string;
    description: string;
    status?: 'Active' | 'Inactive';
    leads?: string[];
    accounts?: string[];
}

export interface CampaignLeadMessage {
    _id: string;
    campaign: string;
    lead: string;
    message: string;
    created_at: string;
    updated_at: string;
    __v: number;
}

export interface NewCampaignLeadMessage {
    campaign: string;
    lead: string;
    message: string;
}

export interface JoinedCampaign {
    _id: string;
    name: string;
    description: string;
    status: 'Active' | 'Inactive';
    leads: Lead[];
    accounts: Account[];
    created_at: string;
    updated_at: string;
    __v: number;
}
