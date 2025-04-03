
import { Lead, NewLead } from "../types/lead";

const isDevelopment = import.meta.env.MODE === "development";
const API_BASE_URL = isDevelopment ? import.meta.env.VITE_API_HOST : `${window.location.origin}`

export const getLeads = async (): Promise<Lead[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/leads`);
        if (!response.ok) throw new Error('Failed to fetch leads');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching leads:", error);
        throw error;
    }
};

export const getLead = async (id: string): Promise<Lead | undefined> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/leads/${id}`);
        if (!response.ok) throw new Error('Failed to fetch lead');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching lead ${id}:`, error);
        throw error;
    }
};

export const createLead = async (lead: NewLead): Promise<Lead> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/leads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lead),
        });
        if (!response.ok) throw new Error('Failed to create lead');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating lead:", error);
        throw error;
    }
};

export const updateLead = async (id: string, lead: Partial<Lead>): Promise<Lead> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/leads/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lead),
        });
        if (!response.ok) throw new Error('Failed to update lead');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error updating lead ${id}:`, error);
        throw error;
    }
};

export const deleteLead = async (id: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/leads/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete lead');
        return true;
    } catch (error) {
        console.error(`Error deleting lead ${id}:`, error);
        throw error;
    }
};
