import express from 'express';
import { getProfileInfo } from '../controllers/crawlerController';

const crawlerRouter = express.Router();

crawlerRouter.post('/scrape-profile-info', getProfileInfo);

export default crawlerRouter
