const User = require('../models/user');
const config = require('../config.js');

exports.getFarms = function(req, res, next) {
    User.find({}, function(err, farms) {
        if(err) {
            return next(err);
        }
        
        console.log(farms[1]);
        delete farms[1].email;
        console.log(farms[1]);

        res.send(farms);
    });
}