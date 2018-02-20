const mongoose = require('mongoose');
const NodeGeocoder = require('node-geocoder');
const config = require('../config');
const Schema = mongoose.Schema;

const geolocationSchema = new Schema({
    lng: Number,
    lat: Number
});

geolocationSchema.pre('save', function(next) {
    const geocoder = NodeGeocoder({ provider: 'google', apiKey: config.googleApiKey });
    const farm = this.ownerDocument().farm;
    const address = farm.street + '' + farm.zip + '' + farm.city;
    geolocation = this;

    geocoder.geocode(address, function(err, res) {
        if(err) { return next(err); }
        console.log(res);

        geolocation.lng = res[0].longitude;
        geolocation.lat = res[0].latitude;

        console.log(this);
        next();
      });
});

const ModelClass = mongoose.model('geolocation', geolocationSchema);

module.exports = ModelClass;