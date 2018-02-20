const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Products = require('./products');
const Geolocation = require('./geolocation');

const farmSchema = new Schema({
    name: { type: String, lowercase: true },
    street: { type: String, lowercase: true },
    zip: String, 
    city: { type: String, lowercase: true },
    country: { type: String, lowercase: true },
    products: Products.schema,
    geolocation: Geolocation.schema
});

//Find longitude & latitude



const ModelClass = mongoose.model('farm', farmSchema);

module.exports = ModelClass;