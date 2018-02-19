const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const farmSchema = new Schema({
    strawberry: Boolean,
    blueberry: Boolean,
    cranberry: Boolean,
    lingonberry: Boolean,
    bolete: Boolean, //tatti
    chantarelle: Boolean //kantarelli 
});

const ModelClass = mongoose.model('products', farmSchema);

module.exports = ModelClass;