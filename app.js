const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Trail = require('./models/trail');
const ejsMate = require('ejs-mate');

mongoose.connect('mongodb://127.0.0.1:27017/local-trails', { useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('Connected to MongoDB');
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

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

app.get('/trails/:id/edit', async (req, res) => {
    //Implement find
    const trail = await Trail.findById(req.params.id)
    res.render('trails/edit', { trail }); //Render the show page with the trail
})

app.put('/trails/:id', async (req, res) => {
    const { id } = req.params;
    const trail = await Trail.findByIdAndUpdate(id, {...req.body.trail });
    res.redirect(`/trails/${trail._id}`);
})

app.delete('/trails/:id', async (req, res) => {
    const { id } = req.params;
    await Trail.findByIdAndDelete(id);
    res.redirect('/trails');
});


app.listen(3000, () => { 
    console.log('Server running on port 3000');
});