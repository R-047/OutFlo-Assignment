import mongoose, { Document, Schema } from 'mongoose';

export interface ILead extends Document {
    name: string;
    job_title: string;
    company: string;
    location: string;
    linkedin_url: string;
    is_deleted: boolean;
    created_at: Date;
    updated_at: Date;
}

const LeadSchema: Schema = new Schema({
    name: { type: String, required: true },
    job_title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    linkedin_url: { type: String, required: true },
    is_deleted: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// Export the model
export default mongoose.model('Lead', LeadSchema);
