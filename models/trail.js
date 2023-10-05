const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrailSchema = new Schema({
    title: String,
    image: String,
    location: String,
    longitude: String,
    latitude: String,
    description: String,
});

module.exports = mongoose.model('Trail', TrailSchema);