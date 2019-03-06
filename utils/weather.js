/*
 * @TODO logic validation for location input - require a country code
 * read in a country code file and check against it
 */

const https = require('https')

module.exports = (location, callType, callback) => {

    // call the same networking code but pass in a parameter for "searchType" - write a ternary operator to see 
    // if its "today" or "forecast" - depending on which, we can use a "const" for the path - both consts will
    // be included outside of the exports file (don't need to export the const, only the response data)
    const formattedLocation = location.split(' ').join('+')

    var weatherCall

    switch (callType) {
        case "today":
            weatherCall = "weather"
            break
        case "forecast":
            weatherCall = "forecast"
            break
    }

    const options = {
        hostname: "api.openweathermap.org",
        path: `/data/2.5/${weatherCall}?q=${formattedLocation}&appid=2064bed5488284ff55690da4bb180185&units=imperial`,
        method: "GET"
    }

    // request function calls back with response data
    const req = https.request(options, (res) => {
        var aggregator = ''
        res.on('data', (d) => {
            aggregator += d
        })
        res.on('end', () => {
            const parsed = JSON.parse(aggregator)
            callback(false, parsed)
        })
    })

    req.on('error', (e) => {
        console.error(e.message)
    })
    req.end()
}
