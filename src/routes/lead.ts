import express, { Router } from 'express';
import {
    getLeads,
    getLeadById,
    createLead,
    updateLead,
    deleteLead,
    hardDeleteLead,
} from '../controllers/leadController';

const leadRouter: Router = express.Router();

// Get all leads
leadRouter.get('/', getLeads);

// Get lead by ID
leadRouter.get('/:id', getLeadById);

// Create new lead
leadRouter.post('/', createLead);

// Update lead
leadRouter.put('/:id', updateLead);

// Soft delete lead
leadRouter.delete('/:id', deleteLead);

// Hard delete lead (optional - for admin purposes)
leadRouter.delete('/permanent/:id', hardDeleteLead);


export default leadRouter;
