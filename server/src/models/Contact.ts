import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  phone: { type: String, required: true },
});

export const Contact = mongoose.model('Contact', contactSchema);
