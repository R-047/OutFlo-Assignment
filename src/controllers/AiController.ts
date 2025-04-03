
import { Request, Response } from 'express';
import AI from '../utils/Ai';
export const generateMessage = async (req: Request, res: Response): Promise<void> => {
    const { campaign_name, campaign_desc, lead_name, job_title, location, company, summary } = req.body;

    try {
        const personalizedMessage = await AI.generatePersonalizedMessage(
            campaign_name,
            campaign_desc,
            lead_name,
            job_title,
            location,
            company,
            summary
        );

        res.status(200).json({ message: personalizedMessage });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
