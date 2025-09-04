const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

// Configure CORS to allow your frontend URL
app.use(cors({
  origin: 'https://crud-notes-frontend-08ro.onrender.com', // Replace with your actual frontend Render URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true // Allow cookies/auth headers if needed
}));

// Define routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));