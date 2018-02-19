const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NodeGeocoder = require('node-geocoder');

//Define model
const farmSchema = new Schema({
    name: { type: String, lowercase: true },
    street: { type: String, lowercase: true },
    zip: String, 
    city: { type: String, lowercase: true },
    country: { type: String, lowercase: true },
    lng: Number,
    lat: Number,
    strawberry: Boolean,
    blueberry: Boolean
});

//Find longitude & latitude
farmSchema.pre('save', function(next) {
    const geocoder = NodeGeocoder({ provider: 'google' });
    const farm = this;
    const address = farm.street + '' + farm.zip + '' + farm.city;

    geocoder.geocode(address, function(err, res) {
        if(err) { return next(err); }
        console.log(res);

        farm.lng = res.longitude;
        farm.lat = res.latitude;
        next();
      });
});


//Create the model class
const ModelClass = mongoose.model('farm', farmSchema);

//Export the model
module.exports = ModelClass;