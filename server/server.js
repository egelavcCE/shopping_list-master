require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/dbConfig');
const authRoutes = require('./routes/authRoute');
const cartRoutes = require('./routes/cartRoute');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://shopping-list-master.vercel.app',
    'https://v0-new-project-6iryjpujchb-yvyqohclh-eges-projects-df28e859.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(bodyParser.json());

// Database connection
connectDB();

// Routes
app.use('/api', authRoutes);
app.use('/api', cartRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Bir şeyler ters gitti!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});