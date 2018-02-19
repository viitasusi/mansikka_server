const Farm = require('../models/farm');
const User = require('../models/user');
const config = require('../config.js');

exports.saveProducts = function(req, res, next) {
    const products = new Products({
        strawberry: req.body.strawberry,
        blueberry: req.body.blueberry,
        cranberry: req.body.cranberry,
        lingonberry: req.body.lingonberry,
        bolete: req.body.bolete, //tatti
        chantarelle: req.body.chantarelle //kantarelli
    });

    user.save(function(err) {
        if(err) { return next(err); }

        res.json({ saved: 'products saved' });
    });
}