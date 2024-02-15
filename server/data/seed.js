const mongoose = require('mongoose');
const Beer = require('../models/beer');
const Brewery = require('../models/brewery');
const User = require('../models/user');
const beersData = require('./beers.json');
const breweriesData = require('./breweries.json');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: './config.env' });

const usersData = [
    {
        email: 'admin@example.com',
        password: bcrypt.hashSync('admin', 10),
        isAdmin: true
    },
    {
        email: 'user@example.com',
        password: bcrypt.hashSync('user', 10),
    },
    {
        email: 'test@example.com',
        password: bcrypt.hashSync('test', 10),
    },
    {
        email: 'student@example.com',
        password: bcrypt.hashSync('student', 10),
    },
];

// Connect to MongoDB
const uri = process.env.ATLAS_URI;
mongoose
    .connect(uri)
    .then(() => {
        console.log('Successfully connected to MongoDB.');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

async function seedBeers() {
    try {
        // Clear existing data
        await Beer.deleteMany();

        // Insert new data
        await Beer.insertMany(beersData);
        console.log('Beers seeded successfully');
    } catch (err) {
        console.error('Error seeding beers:', err);
    }
}

async function seedBreweries() {
    try {
        // Clear existing data
        await Brewery.deleteMany();

        // Insert new data
        await Brewery.insertMany(breweriesData);
        console.log('Breweries seeded successfully');
    } catch (err) {
        console.error('Error seeding breweries:', err);
    }
}

async function seedUsers() {
    try {
        // Clear existing data
        await User.deleteMany();

        // Insert new data
        await User.insertMany(usersData);
        console.log('Users seeded successfully');
    } catch (err) {
        console.error('Error seeding users:', err);
    }
}

async function seedAll() {
    await seedBreweries(); // Seed breweries first, as beers reference breweries
    await seedBeers();
    await seedUsers();
    mongoose.connection.close();
}

// Start seeding
seedAll();
