const https = require('https')
const weatherAPI = require("../utils/weather")

module.exports = (args) => {
    try {
        const location = args.location || args.l
        const city = (location.split(','))[0]
        const results = weatherAPI(location, "forecast", (err, data) => {
            if (!err && data) {
                console.log(data)
                console.log(`Current weather in ${city}:`)
                //console.log(`\t${temp}° and ${main}`)
            } else {
                console.error(err.message)
            }
        })
    } catch (err){
        console.error(err.message)
    }
}