require('dotenv').config(); // Load environment variables from .env file

const mongoose = require('mongoose');

/**
 * Connect to MongoDB database using Mongoose.
 * The connection URI and credentials are loaded from environment variables.
 */
const connectDB = async () => {
  try {
    // MongoDB connection URI and options
    const dbURI = process.env.MONGO_URI;
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,    // Use new URL parser to avoid deprecation warnings
      useUnifiedTopology: true, // Use new Server Discover and Monitoring engine
      user: process.env.DB_USER, // MongoDB username
      pass: process.env.DB_PASS, // MongoDB password
    });

    console.log('MongoDB connected');

    // Handle MongoDB connection events
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });

  } catch (error) {
    console.error('MongoDB connection error:', error.stack);
    process.exit(1); // Exit process with failure code
  }
};

module.exports = connectDB;