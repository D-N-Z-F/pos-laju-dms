import { Request, Response } from "express";
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
