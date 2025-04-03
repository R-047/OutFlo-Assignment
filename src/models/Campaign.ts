import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ICampaign extends Document {
    name: string;
    description: string;
    status: 'Active' | 'Inactive' | 'Deleted';
    leads: Types.ObjectId[];
    accounts: Types.ObjectId[];
    created_at: Date;
    updated_at: Date;
}

const CampaignSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Inactive', 'Deleted'], default: 'Active' },
    leads: [{ type: Schema.Types.ObjectId, ref: 'Lead' }],
    accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Campaign', CampaignSchema);
