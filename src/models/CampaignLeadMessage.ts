import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ICampaignLeadMessage extends Document {
    campaign: Types.ObjectId;
    lead: Types.ObjectId;
    message: string;
    created_at: Date;
    updated_at: Date;
}

const CampaignLeadMessageSchema: Schema = new Schema({
    campaign: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
    lead: { type: Schema.Types.ObjectId, ref: 'Lead', required: true },
    message: { type: String, },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('CampaignLeadMessage', CampaignLeadMessageSchema);
