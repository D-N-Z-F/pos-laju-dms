import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { saveMessage } from "./controllers/functions";

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
  const apiUrl = "https://dash.wasapbot.my/api/send";
  const payload = {
    number: number,
    type: "text",
    message: message,
    instance_id: "668768DB96ECF",
    access_token: "668755e172ebf",
  };

  try {
    const response = await axios.post(apiUrl, null, { params: payload });
    const savedMessage = await saveMessage(number, message);
    io.emit("New Message.", savedMessage);
    res.json(response.data);
  } catch (error: any) {
    console.error("Error sending message:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/receive-message", async (req: Request, res: Response) => {
    try {
    const { number, message } = req.body;
    const savedMessage = await saveMessage(number, message);
    io.emit("New Message.", savedMessage);
    res.send('Message received.');
  } catch (error: any) {
    console.error("Error saving message:", error.message);
    res.status(500).send(error.message);
  }
});

// app.get("/haha", async (req: Request, res: Response) => {
//     try {
//     const savedMessage = await saveMessage('60123456789', 'TESTTESTTEST');
//     console.log(savedMessage);
//     res.send(savedMessage);
//   } catch (error: any) {
//     console.error("Error saving message:", error.message);
//     res.status(500).send(error.message);
//   }
// });