const Brewery = require('../models/brewery');
const Beer = require('../models/beer');

exports.getBreweries = async (req, res) => {
    try {
        const breweries = await Brewery.find();
        res.json(breweries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBrewery = async (req, res) => {
    try {
        const brewery = await Brewery.findById(req.params.id);
        res.json(brewery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createBrewery = async (req, res) => {
    const brewery = new Brewery({
        name: req.body.name,
        location: req.body.location,
        image: req.body.image,
        description: req.body.description,
        website: req.body.website
    });

    try {
        const newBrewery = await brewery.save();
        res.status(201).json(newBrewery);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateBrewery = async (req, res) => {
    try {
        const brewery = await Brewery.findById(req.params.id);
        brewery.name = req.body.name;
        brewery.location = req.body.location;
        brewery.image = req.body.image;
        brewery.description = req.body.description;
        brewery.website = req.body.website;

        const updatedBrewery = await brewery.save();
        res.json(updatedBrewery);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteBrewery = async (req, res) => {
    try {
        const breweryId = req.params.id;

        // Check if there are any beers associated with the brewery
        const beers = await Beer.find({ brewery: breweryId });
        if (beers.length > 0) {
            return res.status(400).json({ message: 'Cannot delete brewery because it has associated beers' });
        }

        // If no associated beers, proceed with brewery deletion
        const brewery = await Brewery.findById(breweryId);
        if (!brewery) {
            return res.status(404).json({ message: 'Brewery not found' });
        }

        await brewery.deleteOne();
        res.json({ message: 'Brewery deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = exports;
