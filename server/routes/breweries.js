var express = require('express');
var router = express.Router();
const breweryController = require('../controllers/breweries');
const requireAuth = require('../middleware/requireAuth');
const requireAdmin = require('../middleware/requireAdmin');

router.use(requireAuth);

router.get('/', breweryController.getBreweries);
router.get('/:id', breweryController.getBrewery);

// These routes are for admin users only
router.post('/', requireAdmin, breweryController.createBrewery);
router.put('/:id', requireAdmin, breweryController.updateBrewery);
router.delete('/:id', requireAdmin, breweryController.deleteBrewery);

module.exports = router;
