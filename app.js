const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Trail = require('./models/trail');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-trails', { useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('Connected to MongoDB');
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home')
 });

app.get('/maketrail', async (req, res) => {
    const trail = new Trail({
        title: 'Milton Trail',
        description: 'Beautiful Milton Trail',
        location: 'Milton, Ontario'
    });
    await trail.save();
    res.send(trail)
 });

app.listen(3000, () => { 
    console.log('Server running on port 3000');
});