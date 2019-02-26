const weatherAPI = require('../utils/weather')


module.exports = (args) => {
        const location = args.location || args.l
        const results = weatherAPI(location, function (err, data) {
        
            if (!err) {
                const {temp} = data.main
                console.log(`The weather in ${location} is ${temp} degrees`)
            } else {
                if (data) {console.log("we have data")} else {console.log("no data yet")}
            }
        })
}