const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🔐 Auth API is running!',
    endpoints: {
      register: 'POST /api/auth/register',
      login:    'POST /api/auth/login',
      profile:  'GET  /api/auth/profile (Bearer Token required)',
    },
  });
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});