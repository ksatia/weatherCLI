const weatherAPI = require('../utils/weather')
const ora = require('ora')


module.exports = (args) => {
    const spinner = ora().start()
    try {
        const location = args.location || args.l
        const city = (location.split(','))[0]
        const results = weatherAPI(location, "today", function (err, data) {
            if (!err && data) {
                const {temp} = data.main
                const {main} = data.weather[0]
                spinner.stop()
                console.log(`Current weather in ${city}:`)
                console.log(`\t${temp}° and ${main}`)
            } else {
                console.error(err.message)
            }
        })
    } catch (err) {
        spinner.stop()
        console.error(err.message)
    }
} 