import express from 'express';
import { getMessagesByCampaign, createMessage, editMessage } from '../controllers/campaignLeadMessageController';
import { generateMessage } from '../controllers/AiController';

const aiRouter = express.Router();

aiRouter.post('/generateMessage', generateMessage);

export default aiRouter
