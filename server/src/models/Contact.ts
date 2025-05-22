import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  isTechnician: { type: Boolean, default: false }
});

export const Contact = mongoose.model('Contact', contactSchema);
