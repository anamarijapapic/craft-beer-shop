const Beer = require('../models/beer');
const Brewery = require('../models/brewery');

exports.getBeers = async (req, res) => {
    try {
        const beers = await Beer.find().populate('brewery');

        if (req.query.sortBy === 'breweryName') {
            beers.sort((a, b) => a.brewery.name.localeCompare(b.brewery.name));
        }

        res.json(beers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBeer = async (req, res) => {
    try {
        const beer = await Beer.findById(req.params.id).populate('brewery');
        res.json(beer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createBeer = async (req, res) => {
    try {
        const { name, style, image, abv, ibu, description, price, breweryId } = req.body;

        // Find the brewery object based on its ID
        const brewery = await Brewery.findById(breweryId);
        if (!brewery) {
            return res.status(404).json({ message: 'Brewery not found' });
        }

        // Create the new beer and assign the brewery object to its brewery field
        const newBeer = new Beer({
            name,
            style,
            image,
            abv,
            ibu,
            description,
            price,
            brewery: brewery._id // Assign the brewery object
        });

        // Save the new beer
        const savedBeer = await newBeer.save();

        // Populate the brewery field in the response
        await savedBeer.populate('brewery');

        res.status(201).json(savedBeer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateBeer = async (req, res) => {
    try {
        const { name, style, image, abv, ibu, description, price, breweryId } = req.body;

        // Find the beer object based on its ID
        const beer = await Beer.findById(req.params.id);
        if (!beer) {
            return res.status(404).json({ message: 'Beer not found' });
        }

        // Find the brewery object based on its ID
        const brewery = await Brewery.findById(breweryId);
        if (!brewery) {
            return res.status(404).json({ message: 'Brewery not found' });
        }

        // Update the beer object
        beer.name = name;
        beer.style = style;
        beer.image = image;
        beer.abv = abv;
        beer.ibu = ibu;
        beer.description = description;
        beer.price = price;
        beer.brewery = brewery._id; // Assign the brewery object

        // Save the updated beer
        const updatedBeer = await beer.save();

        // Populate the brewery field in the response
        await updatedBeer.populate('brewery');

        res.json(updatedBeer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteBeer = async (req, res) => {
    try {
        const beer = await Beer.findById(req.params.id);
        if (!beer) {
            return res.status(404).json({ message: 'Beer not found' });
        }

        await beer.deleteOne();
        res.json({ message: 'Beer deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = exports;
