require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(
    cors({
      origin: ['https://tran-thang.vercel.app'],
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    })
  );
app.options('*', cors());
app.use(express.json());


const emailRouter = require('./Message');
app.use('/api/email', emailRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});