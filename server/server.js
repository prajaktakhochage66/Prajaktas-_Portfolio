import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',').map(x => x.trim()) || '*' }));
app.use(express.json());
app.get('/', (_req, res) => {
  res.json({
    message: 'Prajakta Portfolio Backend is Working!'
  });
});
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
}, { timestamps: true });
const Contact = mongoose.model('Contact', contactSchema);

app.get('/api/health', (_req, res) => res.json({ ok: true, message: 'Prajakta portfolio API is running.' }));
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) return res.status(400).json({ message: 'Please complete all fields.' });
    if (!process.env.MONGO_URI) return res.status(503).json({ message: 'MongoDB is not configured yet. Please email Prajakta directly.' });
    await Contact.create({ name, email, subject, message });
    res.status(201).json({ message: 'Thanks! Your message has been received.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/prajakta_portfolio')
  .then(() => {
    console.log('MongoDB connected successfully!');
    app.listen(PORT, () => {
      console.log(`Portfolio API running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log('MongoDB connection failed:');
    console.log(error.message);

    app.listen(PORT, () => {
      console.log(`Portfolio API running on http://localhost:${PORT}`);
    });
  });
