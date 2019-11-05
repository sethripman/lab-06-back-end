require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const geoData = require('./data/geo.json');
const darkSky = require('./data/darksky.json');

app.use(cors());
app.use(express.static('./public'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


app.get('/location', (request, response) => {
    try {
        const location = request.query.location;
        const result = getLatLng(location);
        response.status(200).json(result);
    }
    catch (err) {
        // TODO: make an object and send via .json...
        response.status(500).send('Sorry something went wrong, please try again');
    }
});

app.get('/weather', (request, response) => {
    try {
        const weather = request.query.weather;
        const result = getForecastTime(weather);
        response.status(200).json(result);
    }
    catch (err) {
        // TODO: make an object and send via .json...
        response.status(500).send('Sorry something went wrong, please try again');
    }
});


function getLatLng(location) {
    if (location === 'bad location') {
        throw new Error();
    }

    // ignore location for now, return hard-coded file
    // api call will go here

    // convert to desired data format:
    return toLocation(geoData);
}

function toLocation(/*geoData*/) {
    const firstResult = geoData.results[0];
    const geometry = firstResult.geometry;
    
    return {
        formatted_query: firstResult.formatted_address,
        latitude: geometry.location.lat,
        longitude: geometry.location.lng
    };
}

function getForecastTime(weather) {
    if (weather === 'bad time') {
        throw new Error();
    }

    // ignore location for now, return hard-coded file
    // api call will go here

    // convert to desired data format:
    return toWeather(darkSky);
}

function toWeather(/*darkSky*/) {
    const firstResult = darkSky[0];
    const days = firstResult.daily;

    const dayArray = [];
    days.data.forEach(day => {
        const timeString = (day.time.toDateString());
        dayArray.push({
            forecast: day.summary,
            time: timeString
        });
        
        return dayArray;
    });
    
}