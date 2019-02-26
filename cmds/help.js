const menus = {
    main: `
        outside [command] <options>
        
        today............... show weather for today
        forecast............ show 10-day weather forecast
        version............. show package version
        help................ show help menu for a command`,

    today: `
        outside today <options>
        
        --location, -l .......the location to use (city name)`,

    version: `
        outside version
        
        --version, --v`,

    forecast: `
        outside forecast <options>
        
        --location, -l....... the location to use (city name)`
}

// if we pass multiple commands without flags, args obect will have a K/O pair where key is _
// the value is an array of all commands passed - if the first command is help, subcommand is the next thing to follow
// if the first command IS NOT HELP, make it help
module.exports = (args) => {
    const subCommand = args._[0] === 'help'
        ? args._[1]
        : args._[0]

    console.log(menus[subCommand] || menus.main)
    console.log("\n~")
}
