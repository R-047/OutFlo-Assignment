// src/controllers/leadController.ts
import { Request, Response } from 'express';
import Lead, { ILead } from '../models/Lead';

// Get all leads
export const getLeads = async (req: Request, res: Response): Promise<void> => {
    try {
        const leads = await Lead.find({ is_deleted: { $ne: true } });
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get lead by ID
export const getLeadById = async (req: Request, res: Response): Promise<void> => {
    try {
        const lead = await Lead.findOne({
            _id: req.params.id,
            is_deleted: { $ne: true }
        });

        if (!lead) {
            res.status(404).json({ message: 'Lead not found' });
            return;
        }

        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Create new lead
export const createLead = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, job_title, company, location, linkedin_url } = req.body;

        // Check if lead with same LinkedIn URL already exists
        const existingLead = await Lead.findOne({
            linkedin_url,
            is_deleted: { $ne: true }
        });

        if (existingLead) {
            res.status(400).json({ message: 'Lead with this LinkedIn URL already exists' });
            return;
        }

        const newLead = new Lead({
            name,
            job_title,
            company,
            location,
            linkedin_url,
            is_deleted: false,
            created_at: new Date(),
            updated_at: new Date()
        });

        const savedLead = await newLead.save();
        res.status(201).json(savedLead);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Update lead
export const updateLead = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, job_title, company, location, linkedin_url } = req.body;

        // Check if the lead exists
        const lead = await Lead.findOne({
            _id: req.params.id,
            is_deleted: { $ne: true }
        });

        if (!lead) {
            res.status(404).json({ message: 'Lead not found' });
            return;
        }

        // Check if the updated LinkedIn URL conflicts with another lead
        if (linkedin_url && linkedin_url !== lead.linkedin_url) {
            const existingLead = await Lead.findOne({
                linkedin_url,
                _id: { $ne: req.params.id },
                is_deleted: { $ne: true }
            });

            if (existingLead) {
                res.status(400).json({ message: 'Another lead with this LinkedIn URL already exists' });
                return;
            }
        }

        const updatedLead = await Lead.findByIdAndUpdate(
            req.params.id,
            {
                name,
                job_title,
                company,
                location,
                linkedin_url,
                updated_at: new Date()
            },
            { new: true }
        );

        res.status(200).json(updatedLead);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Soft delete lead
export const deleteLead = async (req: Request, res: Response): Promise<void> => {
    try {
        const lead = await Lead.findOne({
            _id: req.params.id,
            is_deleted: { $ne: true }
        });

        if (!lead) {
            res.status(404).json({ message: 'Lead not found' });
            return;
        }

        await Lead.findByIdAndUpdate(
            req.params.id,
            {
                is_deleted: true,
                updated_at: new Date()
            }
        );

        res.status(200).json({ message: 'Lead deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Hard delete lead (optional - for admin purposes)
export const hardDeleteLead = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedLead = await Lead.findByIdAndDelete(req.params.id);

        if (!deletedLead) {
            res.status(404).json({ message: 'Lead not found' });
            return;
        }

        res.status(200).json({ message: 'Lead permanently deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
