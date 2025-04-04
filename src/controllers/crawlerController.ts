import { Request, Response } from 'express';
import AI from '../utils/Ai';
import Crawler from '../utils/Crawler';
export const getProfileInfo = async (req: Request, res: Response): Promise<void> => {
    const { linkedin_url } = req.body;

    try {
        const profile = await Crawler.getLeadInfo(linkedin_url)
        res.status(200).json({ profile });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
