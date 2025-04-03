import express, { Router } from 'express';
import { addCampaign, deleteCampaign, getCampaignById, getCampaigns, updateCampaign } from '../controllers/campaignController';

const campaignRouter: Router = express.Router();


campaignRouter.get('/', getCampaigns);
campaignRouter.get('/:id', getCampaignById);
campaignRouter.post('/', addCampaign);
campaignRouter.put('/:id', updateCampaign);
campaignRouter.delete('/:id', deleteCampaign);

export default campaignRouter;

