const express = require('express');
const cors = require('cors'); // Import the cors middleware
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');
const app = express();

connectDB();

// CORS configuration to allow requests from your specific frontend domain.
const allowedOrigins = [
  'http://localhost:3000', // For local development
  'https://crud-notes-frontend-08ro.onrender.com' // Your frontend's Render URL
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions)); // Use the cors middleware before any routes
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
