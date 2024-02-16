var express = require('express');
var router = express.Router();
const beerController = require('../controllers/beers');
const requireAuth = require('../middleware/requireAuth');
const requireAdmin = require('../middleware/requireAdmin');

router.use(requireAuth);

router.get('/', beerController.getBeers);
router.get('/:id', beerController.getBeer);

// These routes are for admin users only
router.post('/', requireAdmin, beerController.createBeer);
router.put('/:id', requireAdmin, beerController.updateBeer);
router.delete('/:id', requireAdmin, beerController.deleteBeer);

module.exports = router;
