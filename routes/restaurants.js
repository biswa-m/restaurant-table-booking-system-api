var mongoose = require('mongoose');
var router = require('express').Router();

var Restaurant = mongoose.model('Restaurant');

/*
 * Get list of all varified restaurants by public
 */
// TODO add filter by availibilty during date time
router.get('/', function(req, res, next) {
	var query = {verified: true};

	if (req.query.restaurantid) query._id = req.query.restaurantid;

	Restaurant.find(query).then(function(restaurants) {
		if (!restaurants.length) return res.sendStatus(404);

		let list = []

		restaurants.forEach(function(restaurant) {
			list.push(restaurant.viewJSON());
		});

		return res.json({restaurants: list});
	}).catch(next);
});

module.exports = router;
