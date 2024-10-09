const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path'); // To serve HTML file

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

let events = []; // In-memory storage (you can replace this with a database)

// Serve the HTML file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve your HTML file
});

//Api Request 

app.post('/api/create-event', (req, res) => {
    const { eventName, eventDate, email } = req.body;

    // Store the event in an array or database
    events.push({ eventName, eventDate, email });

    // Schedule the email to be sent at the correct time
    scheduleEmail(eventName, new Date(eventDate), email);

    res.json({ success: true });
});

// Function to send email via API Call-back 
const sendEmail = (eventName, email) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'priyanshukp225@gmail.com',  // Replace with your email
            pass: 'bhhw kohq fdic dlpa'           // Replace with your password
        }
    });

    let mailOptions = {
        from: 'priyanshukp225@gmail.com',
        to: email,
        subject: `Reminder: ${eventName} is happening now!`,
        text: `Your event ${eventName} is starting right now!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

// Function to schedule the email
const scheduleEmail = (eventName, eventDate, email) => {
    const now = new Date();
    const timeUntilEvent = eventDate - now;

    if (timeUntilEvent > 0) {
        setTimeout(() => {
            sendEmail(eventName, email);
        }, timeUntilEvent);
    }
};

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
