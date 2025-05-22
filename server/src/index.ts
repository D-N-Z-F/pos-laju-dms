import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { getAllContacts, getMessageByContactId, saveMessage, saveTechnicianMessage } from "./controllers/functions";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const serverOptions = { cors: { origin: "*" } };
const io = new SocketIOServer(server, serverOptions);
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('DB connection error:', err));

io.on("connection", (socket) => {
  console.log("Client connected: ", socket.id);
  socket.on("disconnect", () => console.log("Client disconnected: ", socket.id));
});

server.listen(PORT, () => console.log(`🚀 Server listening at http://localhost:${PORT}`));

app.get("/", (req: Request, res: Response) => {
  res.send("✅ Server is running!");
});

//-------------------------------------------------------------------

app.post("/send-message", async (req: Request, res: Response) => {
    const { number, message } = req.body;
    console.log("RUNNING SEND MESSAGE", message);
    const apiUrl = "https://dash.wasapbot.my/api/send";
    const payload = {
    number: number,
    type: "text",
    message: message,
    instance_id: "668768DB96ECF",
    access_token: "668755e172ebf",
  };

  try {
    const response = await axios.get(apiUrl, { params: payload, headers: { 'ngrok-skip-browser-warning':  '69420' } });
    console.log(response.data);
    await saveTechnicianMessage(number, message);
    io.emit('newMessage');
    res.json({ message: 'Message sent.' });
  } catch (error: any) {
    console.error("Error sending message:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/receive-message", async (req: Request, res: Response) => {
    try {
        const { number, message } = req.body;
        console.log("RUNNING RECEIVE MESSAGE", message);
        let newNum = number.split('@')[0];
        await saveMessage(newNum, message);
        io.emit('newMessage');
        res.json({ message: 'Message received.' });
    } catch (error: any) {
        console.error("Error saving message:", error.message);
        res.status(500).send(error.message);
    }
});

//-------------------------------------------------------------------

app.get("/contacts", async (req: Request, res: Response) => {
    try {
        const contacts = await getAllContacts();
        res.json(contacts);
    } catch (error: any) {
        console.error("Error getting contacts:", error.message);
        res.status(500).send(error.message);
    }
});

app.get("/messages/:contactId/:technicianId", async (req: Request, res: Response) => {
  try {
    const { contactId, technicianId } = req.params;
    const messages = await getMessageByContactId(contactId, technicianId);
    res.json(messages);
  } catch (error: any) {
    console.error("Error getting messages:", error.message);
    res.status(500).send(error.message);
  }
});

app.get("/haha", async (req: Request, res: Response) => {
    try {
        const savedMessage = await saveMessage('60123456789', 'TESTTESTTEST');
        console.log(savedMessage);
        res.send(savedMessage);
  } catch (error: any) {
    console.error("Error saving message:", error.message);
    res.status(500).send(error.message);
  }
});