import { Request, Response } from 'express';
import Account, { IAccount } from '../models/Account';
import { Types } from 'mongoose';

// Get all accounts
export const getAccounts = async (req: Request, res: Response): Promise<void> => {
    try {
        const accounts: IAccount[] = await Account.find();
        res.status(200).json(accounts);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new account
export const addAccount = async (req: Request, res: Response): Promise<void> => {
    const { linkedin_username, linkedin_password, profile_url } = req.body;
    try {
        const account = new Account({ linkedin_username, linkedin_password, profile_url }) as unknown as IAccount;
        await account.save();
        res.status(201).json(account);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

// Edit an account
export const editAccount = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updates: Partial<IAccount> = req.body;
    try {
        const account = await Account.findByIdAndUpdate(id, updates, { new: true }) as IAccount | null;
        if (!account) {
            res.status(404).json({ error: 'Account not found' });
            return

        }
        res.status(200).json(account);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

// Remove an account
export const removeAccount = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const account = await Account.findByIdAndDelete(id) as IAccount | null;
        if (!account) {
            res.status(404).json({ error: 'Account not found' });
            return
        }
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
