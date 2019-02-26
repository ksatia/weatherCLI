const https = require('https')

module.exports = (location, callback) => {
    const formattedLocation = location.split(' ').join('+')
    const options = {
        hostname: "api.openweathermap.org",
        path: `/data/2.5/weather?q=${formattedLocation}&appid=****&units=imperial`,
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