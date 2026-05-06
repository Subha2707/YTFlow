const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

// Create transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },

  tls: {
    rejectUnauthorized: false,
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,

  family: 4, // force IPv4
});

// Verify SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP VERIFY ERROR:', error);
  } else {
    console.log('SMTP SERVER READY');
  }
});

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'All fields are required',
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Message from ${name}`,

      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Contact Form Submission</h2>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Message:</strong></p>

          <div>
            ${message.replace(/\n/g, '<br/>')}
          </div>
        </div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('EMAIL SENT:', info.messageId);

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully',
    });

  } catch (err) {
    console.error('CONTACT ROUTE ERROR:', err);

    return res.status(500).json({
      success: false,
      error: 'Failed to send message',
    });
  }
});

module.exports = router;