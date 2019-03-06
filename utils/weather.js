/*
 * @TODO logic validation for location input - require a country code
 * read in a country code file and check against it
 */

const https = require('https')

module.exports = (location, callback) => {
    const formattedLocation = location.split(' ').join('+')
    const options = {
        hostname: "api.openweathermap.org",
        path: `/data/2.5/weather?q=${formattedLocation}&appid=2064bed5488284ff55690da4bb180185&units=imperial`,
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