
import { Lead } from "@/types/lead";
import { Campaign, NewCampaign, CampaignLeadMessage, NewCampaignLeadMessage, JoinedCampaign } from "../types/campaign";

const isDevelopment = import.meta.env.MODE === "development";
const API_BASE_URL = isDevelopment ? import.meta.env.VITE_API_HOST : `${window.location.origin}`

// Campaign API methods
export const getCampaigns = async (): Promise<Campaign[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/campaigns`);
        if (!response.ok) throw new Error('Failed to fetch campaigns');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        throw error;
    }
};

export const getCampaign = async (id: string): Promise<JoinedCampaign> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/campaigns/${id}`);
        if (!response.ok) throw new Error('Failed to fetch campaign');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching campaign ${id}:`, error);
        throw error;
    }
};

export const createCampaign = async (campaign: NewCampaign): Promise<Campaign> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/campaigns`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(campaign),
        });
        if (!response.ok) throw new Error('Failed to create campaign');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating campaign:", error);
        throw error;
    }
};

export const updateCampaign = async (id: string, campaign: Partial<Campaign>): Promise<Campaign> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/campaigns/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(campaign),
        });
        if (!response.ok) throw new Error('Failed to update campaign');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error updating campaign ${id}:`, error);
        throw error;
    }
};

export const deleteCampaign = async (id: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/campaigns/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete campaign');
        return true;
    } catch (error) {
        console.error(`Error deleting campaign ${id}:`, error);
        throw error;
    }
};

// Campaign Lead Messages API methods
export const getMessagesByCampaign = async (campaignId: string): Promise<CampaignLeadMessage[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/campaign-messages/${campaignId}`);
        if (!response.ok) throw new Error('Failed to fetch campaign messages');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching messages for campaign ${campaignId}:`, error);
        throw error;
    }
};

export const createMessage = async (message: NewCampaignLeadMessage): Promise<CampaignLeadMessage> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/campaign-messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
        if (!response.ok) throw new Error('Failed to create message');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating campaign message:", error);
        throw error;
    }
};

export const updateMessage = async (id: string, message: { message: string }): Promise<CampaignLeadMessage> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/campaign-messages/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
        if (!response.ok) throw new Error('Failed to update message');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error updating message ${id}:`, error);
        throw error;
    }
};



export const generateMessage = async (
    campaignName: string,
    campaignDesc: string,
    lead: Lead,
): Promise<{ message: { text: string }; id: string }> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/ai/generate-message/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                campaign_name: campaignName,
                campaign_desc: campaignDesc,
                lead_name: lead.name,
                job_title: lead.job_title,
                company: lead.company,
                location: lead.location,
                linkedin_url: lead.linkedin_url,
                summary: lead.summary
            })
        });
        if (!response.ok) throw new Error('Failed to generate message');
        const data = await response.json();
        return { ...data, id: lead._id };
    } catch (error) {
        console.error(`Error generating message `, error);
        throw error;
    }
};
