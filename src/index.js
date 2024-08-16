require('dotenv').config(); // Load environment variables at the start

const express = require('express');
const connectDB = require('./config/database'); // Import the database connection function
const userRoutes = require('./routes/userRoutes'); // Import user routes

const app = express();

// Connect to MongoDB
connectDB(); // Establish the MongoDB connection

// Middleware to parse JSON bodies in requests
app.use(express.json());

// Use the user routes for any requests to /users
app.use('/users', userRoutes);

// Start the server on the specified port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});