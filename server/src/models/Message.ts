import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  contactId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
  number: String,
  message: String,
  fromTechnician: { type: Boolean, default: false },
  sentAt: { type: Date, default: Date.now }
});

export const Message = mongoose.model('Message', messageSchema);
