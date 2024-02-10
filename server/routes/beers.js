var express = require('express');
var router = express.Router();
const beerController = require('../controllers/beers');

router.get('/', beerController.getBeers);
router.get('/:id', beerController.getBeer);
router.post('/', beerController.createBeer);
router.put('/:id', beerController.updateBeer);
router.delete('/:id', beerController.deleteBeer);

module.exports = router;
