const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure username is unique in the database
  },
  password: {
    type: String,
    required: true, // Password is required
  },
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;