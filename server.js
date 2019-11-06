require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const superagent = require('superagent');
// const geoData = require('./data/geo.json');
// const darkSky = require('./data/darksky.json');

app.use(cors());
// app.use(express.static('./public'));

let latlngs;

const formatLocationResponse = locationItem => {
    const {
        geometry: {
            location: {
                lat,
                lng,
            },
        },
        formatted_address,
    } = locationItem;

    return {
        formatted_query: formatted_address,
        latitude: lat,
        longitude: lng,
    };
};

const getWeatherResponse = async(lat, long) => {

    const weatherData = await superagent.get(`https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${lat},${long}`);

    const actualWeatherData = JSON.parse(weatherData.text);
    const dailyArray = actualWeatherData.daily.data;
    console.log(weatherItem);
    return {
        forecast: weatherItem.summary,
        time: new Date(weatherItem.time * 1000).toDateString(),
    };

});
return mundgedArray;

};

const geoJSON = require('./data/geo.json');

app.get('/location', async (req, res) => {
    const searchQuery = req.query.search;
    console.log('TODO: USING THIS SEARCH WITH API', searchQuery);

    const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;

    const locationItem = await superagent.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchQuery}&key=${GEOCODE_API_KEY}`);

    const actualItem = JSON.parse(locationItem.text).results[0];
    const response = formatLocationResponse(actualItem);

    latlgs = response;
    
    res.joson(response);
});

app.get('/weather', async (req, res) => {
    const weatherObject = await getWeatherResponse(latlngs.latitude, latlngs.longitude);

    console.log('TODO: USING THIS SEARCH WITH API', weatherObject);

    res.json(weatherObject);
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


// app.get('/location', (request, response) => {
//     try {
//         const location = request.query.location;
//         const result = getLatLng(location);
//         response.status(200).json(result);
//     }
//     catch (err) {
        
//         response.status(500).send('Sorry something went wrong, please try again');
//     }
// });

// app.get('/weather', (request, response) => {
//     try {
//         const weather = request.query.weather;
//         const result = getForecastTime(weather);
//         response.status(200).json(result);
//     }
//     catch (err) {
        
//         response.status(500).send('Sorry something went wrong, please try again');
//     }
// });


// function getLatLng(location) {
//     if (location === 'bad location') {
//         throw new Error();
//     }

    
//     return toLocation(geoData);
// }

// function toLocation(/*geoData*/) {
//     const firstResult = geoData.results[0];
//     const geometry = firstResult.geometry;
    
//     return {
//         formatted_query: firstResult.formatted_address,
//         latitude: geometry.location.lat,
//         longitude: geometry.location.lng
//     };
// }

// function getForecastTime(weather) {
//     if (weather === 'bad time') {
//         throw new Error();
//     }

    
//     return toWeather(darkSky);
// }

// function toWeather(/*darkSky*/) {
//     const days = darkSky.daily;

//     const dayArray = [];
//     days.data.forEach((day) => {
//         const thisDate = new Date(day.time * 1000);
//         const timeString = thisDate.toDateString();
//         const thisObject = { 
//             forecast: day.summary,
//             time: timeString
//         };
//         dayArray.push(thisObject);
//     });
    
//     return dayArray;
    
// }