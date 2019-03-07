const https = require('https')
const weatherAPI = require("../utils/weather")
const ora = require('ora')

module.exports = (args) => {
    const spinner = ora().start()
    try {
        const location = args.location || args.l
        const city = (location.split(','))[0]
        const results = weatherAPI(location, "forecast", (err, data) => {
            if (!err && data) {
                console.log(`Weather forecast in ${city}:`)
                data.list.forEach(item => {
                    var date = new Date(item.dt * 1000)
                    let dd = (((date.getDate() < 10 ? '0' : '') + date.getDate()))
                    let mm = ((date.getMonth()) + 1)
                    let yy = (date.getFullYear())
                    var AMPM = "P.M."
                    let tempHour = date.getHours()
                    let hh = ((date.getHours() % 12 || 12) - 1)
                    if (hh === 0) {
                        hh = "12"
                    }
                    if (tempHour < 12) {
                        AMPM = "A.M."
                    }
                    if (hh < 10) {
                        hh = `${hh} `
                    }
                    let tempInfo = item.main
                    console.log(`\t${mm}-${dd}-${yy} at ${hh}${AMPM}- Low:${tempInfo.temp_min}° and High:${tempInfo.temp_max}°`)
                })
                spinner.stop()
            } else {
                console.error(err.message)
            }
        })
    } catch (err) {
        console.error(err.message)
    }
}