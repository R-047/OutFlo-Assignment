import express, { Router } from 'express';
import {
    getLeads,
    getLeadById,
    createLead,
    updateLead,
    deleteLead,
    hardDeleteLead
} from '../controllers/leadController';

const router: Router = express.Router();

// Get all leads
router.get('/', getLeads);

// Get lead by ID
router.get('/:id', getLeadById);

// Create new lead
router.post('/', createLead);

// Update lead
router.put('/:id', updateLead);

// Soft delete lead
router.delete('/:id', deleteLead);

// Hard delete lead (optional - for admin purposes)
router.delete('/permanent/:id', hardDeleteLead);

export default router;
