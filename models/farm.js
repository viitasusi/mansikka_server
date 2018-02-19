const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NodeGeocoder = require('node-geocoder');
const config = require('../config');
const Products = require('./products');

const farmSchema = new Schema({
    name: { type: String, lowercase: true },
    street: { type: String, lowercase: true },
    zip: String, 
    city: { type: String, lowercase: true },
    country: { type: String, lowercase: true },
    lng: Number,
    lat: Number,
    products: Products.schema
});

//Find longitude & latitude
farmSchema.pre('save', function(next) {
    const geocoder = NodeGeocoder({ provider: 'google', apiKey: config.googleApiKey });
    const farm = this;
    const address = farm.street + '' + farm.zip + '' + farm.city;

    geocoder.geocode(address, function(err, res) {
        if(err) { return next(err); }
        console.log(res[0].longitude);

        farm.lng = res[0].longitude;
        farm.lat = res[0].latitude;

        console.log(farm.lng);
        next();
      });
});


const ModelClass = mongoose.model('farm', farmSchema);

module.exports = ModelClass;