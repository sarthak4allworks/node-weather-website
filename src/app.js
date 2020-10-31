const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handle bars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sarthak Agarwal'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sarthak Agarwal'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        Message: 'This is the help page',
        name: 'Sarthak Agarwal'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        });
    }
    var address = req.query.address;
    geoCode(address, (error, { Latitude, Longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(Latitude, Longitude, (error, forcastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                address,
                location,
                forecastData: forcastData
            });
        });
    });
    // res.send({
    //     Location: 'Bengaluru',
    //     Temp: 24,
    //     name: 'Sarthak Agarwal',
    //     address: req.query.address
    // });
});

app.get('/products', (req, res) => {
    // console.log(req.query);
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    // res.send('Help article not found');
    res.render('404', {
        title: '    404',
        name: 'Sarthak Agarwal',
        error: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    // res.send('My 404 page');
    res.render('404', {
        title: '404',
        name: 'Sarthak Agarwal',
        error: 'Page not Found'
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});