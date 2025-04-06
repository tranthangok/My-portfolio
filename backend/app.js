require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(
    cors({
      origin: ['http://localhost:5173'],
      methods: ["GET", "POST"],
    })
  );
app.use(express.json());

const emailRouter = require('./Message');
app.use('/api/email', emailRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});