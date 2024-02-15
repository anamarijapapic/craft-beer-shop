const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config({ path: './config.env' });
const jwtSecret = process.env.JWT_TOKEN_SECRET;

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create the new user
        const newUser = new User({
            email,
            password
        });

        // Save the new user
        const savedUser = await newUser.save();

        res.status(201).json({ _id: savedUser._id, email: savedUser.email, isAdmin: savedUser.isAdmin });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Create and assign a token
        const token = jwt.sign({
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin
        }, jwtSecret, { expiresIn: '3h' });

        res.json({ token, user: { _id: user._id, email: user.email, isAdmin: user.isAdmin }});
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.logout = async (req, res) => {
    try {
        res.header('Authorization', '');
        res.json({ message: 'Logged out' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
