var express = require('express');
var router = express.Router();
const breweryController = require('../controllers/breweries');

router.get('/', breweryController.getBreweries);
router.get('/:id', breweryController.getBrewery);
router.post('/', breweryController.createBrewery);
router.put('/:id', breweryController.updateBrewery);
router.delete('/:id', breweryController.deleteBrewery);

module.exports = router;
