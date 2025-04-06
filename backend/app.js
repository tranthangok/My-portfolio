const http = require('http');
const { URL } = require('url');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
});

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://tran-thang.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === '/api/email/send-message' && req.method === 'POST') {
    try {
      let body = '';
      req.on('data', chunk => body += chunk.toString());
      
      req.on('end', async () => {
        const { name, email, message } = JSON.parse(body);

        const adminMailOptions = {
          to: process.env.NODEMAILER_USER,
          subject: 'New Message from User',
          html: `
            <h3>New Message Received</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
          `
        };

        const userMailOptions = {
          to: email,
          subject: 'Thank You for Your Message - Tran Thang',
          text: `Hello,\n\nThank you for your Message, we will try to answer you as soon as possible, around 1-7 business days.\n\nBest regards,\nTran Thang\n\n*This is an automated email from the system, please don't respond to this email*` // Giữ nguyên nội dung
        };

        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(userMailOptions);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Message submitted successfully' }));
      });
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
  } else {
    res.writeHead(404);
    res.end();
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});