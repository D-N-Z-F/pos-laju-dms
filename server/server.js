// server.js
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors');

// Twilio credentials
const accountSid = 'AC96e346b48d896764878e188f0f7be4ca';
const authToken = 'fe1df7d191d932e44f5947008fac4fd9';
const twilioClient = twilio(accountSid, authToken);

// Initialize express app
const app = express();
const port = 3000; // Localhost port

// Middleware to parse x-www-form-urlencoded data (for form data)
app.use(bodyParser.urlencoded({ extended: false })); // For form-urlencoded body
app.use(express.json());  // For JSON body (optional depending on request format)
app.use(cors()); // Enable CORS for local requests

// WhatsApp send route
app.post('/send-whatsapp', (req, res) => {
    try {
        // Log incoming body to check its content
        console.log('📦 Received request body for send-whatsapp:', req.body);

        // Destructure 'to' and 'body' from req.body (these should be passed in the request)
        const { to, body } = req.body;

        // Validate required fields 'to' and 'body'
        if (!to || !body) {
            return res.status(400).send('Missing required parameters (to, body)');
        }

        // Send WhatsApp message using Twilio API
        twilioClient.messages.create({
            from: 'whatsapp:+14155238886',  // Your Twilio WhatsApp number or sandbox number
            to: `whatsapp:${to}`,            // Receiver's WhatsApp number
            body: body                      // Message content
        })
            .then(message => {
                console.log('✅ Sent message:', message);
                console.log('✅ Sent message SID:', message.sid);
                // Store the message in the array
                messages.push({ from: "You", body });
                res.status(200).json({ success: true, sid: message.sid });
            })
            .catch(error => {
                console.error('❌ Error sending message:', error);
                res.status(500).json({ error: 'Error sending message' });
            });
    } catch (error) {
        console.error('❌ Error in send-whatsapp route:', error);
        res.status(500).send('Internal Server Error');
    }
});
// app.post('/send-whatsapp', async (req, res) => {
//   const { to, message } = req.body;

//   try {
//     const response = await twilioClient.messages.create({
//       body: message,
//       from: 'whatsapp:+14155238886', // Twilio sandbox number (for testing)
//       to: `whatsapp:${to}`, // Recipient phone number (E.164 format)
//     });
//     res.json({ success: true, messageSid: response.sid });
//   } catch (error) {
//     console.error('Error sending message:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

let messages = [];

// Webhook to handle incoming messages
app.post('/receive-whatsapp', (req, res) => {
    const from = req.body.From; // Sender's phone number
    const messageBody = req.body.Body; // Message text

    console.log(`Received message from ${from}: ${messageBody}`);

    // You can store the message or process it here
    // Store the message in the array
    messages.push({ from, messageBody });

    // For example, send a response to the user (optional)
    //   twilioClient.messages.create({
    //     body: 'Thank you for your message!',
    //     from: 'whatsapp:+14155238886',  // Twilio WhatsApp number
    //     to: from  // Respond to the sender
    //   });

    // Respond to Twilio with a 200 OK
    res.status(200).send('<Response></Response>');
});

// API endpoint to fetch messages for frontend
app.get('/messages', (req, res) => {
    res.json(messages);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
