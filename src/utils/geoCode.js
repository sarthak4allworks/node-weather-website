var request = require('request');

const geoCode = (address, callback) => {
    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYWdhcndhbHNhcnRoYWsyMSIsImEiOiJja2dpYmVlNXEwNjJyMnFteG0yd3Z6N3ltIn0.3R6P_UWhbir6EUfqkwBrWw&limit=1';
    // both url are same but if address contain some special characters then above url will carsh
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWdhcndhbHNhcnRoYWsyMSIsImEiOiJja2dpYmVlNXEwNjJyMnFteG0yd3Z6N3ltIn0.3R6P_UWhbir6EUfqkwBrWw&limit=1';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else if (body.features.length == 0) {
            callback('Unable to find location try another search', undefined);
        } else {
            const data = body.features[0];
            const result = {
                Latitude: data.center[1],
                Longitude: data.center[0],
                location: data.place_name
            }
            callback(undefined, result);
        }
    });
}

module.exports = geoCode;