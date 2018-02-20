const Farm = require('../models/farm');
const User = require('../models/user');
const Products = require('../models/products');
const config = require('../config.js');

exports.getFarms = function(req, res, next) {
    User.find({}, 'farm', function(err, farms) {
        if(err) {
            return next(err);
        }
        
        res.send(farms);
    });
}

exports.saveFarm = function(req, res, next) {
    const farm = new Farm({
        name: req.body.farm,
        street: req.body.street,
        zip: req.body.zip, 
        city: req.body.city,
        country: req.body.country,
        lng: req.body.lng,
        lat: req.body.lat,
        products: req.body.products
    });

    user.save(function(err) {
        if(err) { return next(err); }

        res.json({ saved: 'farm saved' });
    });
}