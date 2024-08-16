require('dotenv').config(); // Load environment variables from .env file

const User = require('../models/userModel');
const bcrypt = require('bcrypt'); // Library for hashing passwords
const jwt = require('jsonwebtoken'); // Library for generating JSON Web Tokens (JWT)

/**
 * Register a new user.
 * - Validates if the username already exists.
 * - Hashes the password before saving it to the database.
 */
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Log in a user.
 * - Validates username and password.
 * - Generates a JWT token if credentials are correct.
 */
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username exists
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ username: existingUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Update a user's profile.
 * - Allows updating the username.
 */
exports.updateUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const { newUsername } = req.body;

    // Update the user's username
    await User.updateOne({ username }, { username: newUsername });

    return res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};