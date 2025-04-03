// controllers/campaignMessageController.ts
import { Request, Response } from 'express';
import CampaignLeadMessage, { ICampaignLeadMessage } from '../models/CampaignLeadMessage';
import { Types } from 'mongoose';
import Campaign, { ICampaign } from '../models/Campaign';
import { ILead } from '../models/Lead';

// Fetch messages for a specific campaign
export const getMessagesByCampaign = async (req: Request, res: Response): Promise<void> => {
    const { campaignId } = req.params;
    try {
        const messages: ICampaignLeadMessage[] = await CampaignLeadMessage.find({ campaign: campaignId });
        res.status(200).json(messages);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Create a message with an empty message body
export const createMessage = async (req: Request, res: Response): Promise<void> => {
    const { campaign, lead, message } = req.body;
    try {
        const cmessage = new CampaignLeadMessage({ campaign: campaign, lead: lead, message: message }) as unknown as ICampaignLeadMessage;
        await cmessage.save();
        res.status(201).json(message);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

// Edit a message
export const editMessage = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { message } = req.body;
    try {
        const updatedMessage = await CampaignLeadMessage.findByIdAndUpdate(id, { message }, { new: true }) as ICampaignLeadMessage | null;
        if (!updatedMessage) {
            res.status(404).json({ error: 'Message not found' });
            return;
        }
        res.status(200).json(updatedMessage);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};




