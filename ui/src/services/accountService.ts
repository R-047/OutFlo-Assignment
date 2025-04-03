
import { Account, NewAccount } from "../types/account";

const isDevelopment = import.meta.env.MODE === "development";
const API_BASE_URL = isDevelopment ? import.meta.env.VITE_API_HOST : `${window.location.origin}`

export const getAccounts = async (): Promise<Account[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/accounts`);
        if (!response.ok) throw new Error('Failed to fetch accounts');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching accounts:", error);
        throw error;
    }
};

export const createAccount = async (account: NewAccount): Promise<Account> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/accounts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(account),
        });
        if (!response.ok) throw new Error('Failed to create account');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating account:", error);
        throw error;
    }
};

export const updateAccount = async (id: string, account: Partial<Account>): Promise<Account> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/accounts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(account),
        });
        if (!response.ok) throw new Error('Failed to update account');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error updating account ${id}:`, error);
        throw error;
    }
};

export const deleteAccount = async (id: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/accounts/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete account');
        return true;
    } catch (error) {
        console.error(`Error deleting account ${id}:`, error);
        throw error;
    }
};
