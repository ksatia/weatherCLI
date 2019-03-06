// use destructuring to pull the version number from our package.json file
const {version} = require('../package.json')
const ora = require('ora')

module.exports = () => {
    console.log(`v${version}`)
}