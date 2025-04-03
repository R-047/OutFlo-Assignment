// controllers/campaignController.ts
import { Request, Response } from 'express';
import Campaign, { ICampaign } from '../models/Campaign';
import { Types } from 'mongoose';
import Lead from '../models/Lead';
import Account from '../models/Account';

// Fetch all campaigns (excluding DELETED)
export const getCampaigns = async (req: Request, res: Response): Promise<void> => {
    try {
        const campaigns: ICampaign[] = await Campaign.find({ status: { $ne: 'DELETED' } });
        res.status(200).json(campaigns);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch a single campaign by ID
export const getCampaignById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const campaign = await Campaign.findById(id)
            .populate({ path: 'leads', model: Lead })
            .populate({ path: 'accounts', model: Account }) as ICampaign | null
        if (!campaign || campaign.status === 'Deleted') {
            res.status(404).json({ error: 'Campaign not found' });
            return;
        }
        res.status(200).json(campaign);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

// Create a new campaign
export const addCampaign = async (req: Request, res: Response): Promise<void> => {
    const { name, description, status, leads, accounts } = req.body;
    try {
        const campaign = new Campaign({ name, description, status, leads, accounts }) as unknown as ICampaign;
        await campaign.save();
        res.status(201).json(campaign);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

// Update campaign details
export const updateCampaign = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updates: Partial<ICampaign> = req.body;
    try {
        const campaign = await Campaign.findByIdAndUpdate(id, updates, { new: true }) as ICampaign | null;
        if (!campaign) {
            res.status(404).json({ error: 'Campaign not found' });
            return;
        }
        res.status(200).json(campaign);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

// Soft delete a campaign
export const deleteCampaign = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const campaign = await Campaign.findByIdAndUpdate(id, { status: 'DELETED' }, { new: true }) as ICampaign | null;
        if (!campaign) {
            res.status(404).json({ error: 'Campaign not found' });
            return;
        }
        res.status(200).json({ message: 'Campaign deleted successfully' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
