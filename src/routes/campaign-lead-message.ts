import express from 'express';
import { getMessagesByCampaign, createMessage, editMessage } from '../controllers/campaignLeadMessageController';

const campaignLeadMessageRouter = express.Router();

campaignLeadMessageRouter.get('/:campaignId', getMessagesByCampaign);
campaignLeadMessageRouter.post('/', createMessage);
campaignLeadMessageRouter.put('/:id', editMessage);

export default campaignLeadMessageRouter
