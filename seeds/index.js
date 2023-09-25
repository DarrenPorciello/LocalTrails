const mongoose = require('mongoose');
const Trail = require('../models/trail');
const seeds = require('./seeds');

mongoose.connect('mongodb://127.0.0.1:27017/local-trails', { useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('Connected to MongoDB');
});

const seedDB = async () => {
    await Trail.deleteMany({}); //delete everything
    for (let i = 0; i < seeds.length; i ++) {
        const trail = new Trail({
            title: `${seeds[i].title}`,
            location: `${seeds[i].location}`,
            longitude: `${seeds[i].longitude}`,
            latitude: `${seeds[i].latitude}`,
            description: `${seeds[i].description}`,
        })
        await trail.save(); //save trails
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})