import express from 'express';
import { getAccounts, addAccount, editAccount, removeAccount } from '../controllers/accountController';

const accountRouter = express.Router();

accountRouter.get('/', getAccounts);
accountRouter.post('/', addAccount);
accountRouter.put('/:id', editAccount);
accountRouter.delete('/:id', removeAccount);
export default accountRouter;
