const https = require('https')

module.exports = (args) => {
    
    const location = args.location || args.l
    
    const formattedLocation = location.split(' ').join('+')

    const options = {
        hostname: "api.openweathermap.org",
        path: `/data/2.5/forecast?q=${formattedLocation}&appid=2064bed5488284ff55690da4bb180185&units=imperial`,
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
            
            console.log(parsed)
            // const {list} = parsed
            // list.forEach ((forecastDay) => {
            //     console.log(forecastDay.snow)
            // })
        })
    })

    req.on('error', (e) => {
        console.error(e.message)
    })
    req.end()
}