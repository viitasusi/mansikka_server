const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config.js');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
    res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const farm = req.body.farm;
    const street = req.body.street;
    const zip = req.body.zip;
    const city = req.body.city;
    const country = req.body.country;
    const strawberry = req.body.strawberry;
    const blueberry = req.body.blueberry;


    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide both email and password' });
    }

    User.findOne({ email: email }, function(err, existingUser) {
        if(err) {
            return next(err);
        }
        if(existingUser) {
            return res.status(422).send({ error: 'Email is in use'});
        }

        const user = new User({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            farm: farm,
            street: street,
            zip: zip, 
            city: city,
            country: country,
            strawberry: strawberry,
            blueberry: blueberry
        });

        user.save(function(err) {
            if(err) { return next(err); }

            res.json({ token: tokenForUser(user) });
        });
    });
}