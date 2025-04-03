import mongoose, { Document, Schema } from 'mongoose';

export interface IAccount extends Document {
    linkedin_username: string;
    linkedin_password: string;
    profile_url: string;
    created_at: Date;
    updated_at: Date;
}

const AccountSchema: Schema = new Schema({
    linkedin_username: { type: String, required: true },
    linkedin_password: { type: String, required: true }, // Consider encrypting this
    profile_url: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Account', AccountSchema);
