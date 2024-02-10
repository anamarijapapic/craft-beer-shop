const moongose = require('mongoose');

const beerSchema = new moongose.Schema({
    name: {
        type: String,
        required: true
    },
    style: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    abv: {
        type: Number,
        required: true
    },
    ibu: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brewery: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Brewery',
        required: true
    }
});

module.exports = moongose.model('Beer', beerSchema);
