var request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6e82f1b5356bdbf235fde916458152aa&query=' + latitude + ',' + longitude + '&units=m';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find Location!', undefined);
        } else {
            const current = body.current;
            callback(undefined, current.weather_descriptions[0] + '. It is currently ' + current.temperature + ' c out. It feels like ' + current.feelslike + ' c out '
            + 'Humidity is '+ current.humidity);
        }
    });
}

module.exports = forecast;