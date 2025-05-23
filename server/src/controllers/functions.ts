import { Contact } from "../models/Contact";
import { Message } from "../models/Message";

export const saveMessage = async (number: string, message: string) => {
  let contact = await Contact.findOne({ phone: number });
  if (!contact) {
    contact = new Contact({ phone: number });
    await contact.save();
  }

  const newMessage = new Message({
    contactId: contact._id,
    number,
    message,
  });

  const saved = await newMessage.save();

  return saved;
};

export const saveTechnicianMessage = async (number: string, message: string) => {
  let newContact = await Contact.findOne({ phone: number, isTechnician: false });

  if(!newContact) {
    newContact = new Contact({ phone: number });
    await newContact.save();
  }

  const newMessage = new Message({
    contactId: newContact!._id,
    number,
    message,
    fromTechnician: true
  });

  const saved = await newMessage.save();

  return saved;
};

export const getAllContacts = async () => await Contact.find();

export const getMessageByContactId = async (contactId: any, technicianId: any) => await Message.find({ contactId: { $in: [contactId, technicianId] } }).sort({ sentAt: 1 }).populate('contactId'); 
