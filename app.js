const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Trail = require('./models/trail');

mongoose.connect('mongodb://127.0.0.1:27017/local-trails', { useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('Connected to MongoDB');
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('home')
 });

 app.get('/trails', async (req, res) => {
    const trails = await Trail.find({}); //Find all trails
    res.render('trails/index', { trails }); //Render the index page with the trails
 });

 app.get('/trails/new', (req, res) => {
    res.render('trails/new');
})

//Set up the endpoint as a post where form is submitted to
app.post('/trails', async (req, res) => {
    const trail = new Trail(req.body.trail); //Send
    await trail.save(); //Save
    res.redirect(`/trails/${trail._id}`);
})

app.get('/trails/:id', async (req, res) => {
    //Implement find
    const trail = await Trail.findById(req.params.id)
    res.render('trails/show', { trail }); //Render the show page with the trail
});


app.listen(3000, () => { 
    console.log('Server running on port 3000');
});