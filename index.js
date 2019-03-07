
// export parameterless function as entrypoint to app
module.exports = () => {
    require('dotenv').config()
    const args = require('minimist')(process.argv.slice(2))
    // console.log('Welcome to the outside')

    console.log(args)

    // default to a help menu if no command is passed to "outside"
    // this will also work if user types "outside help" because args._[0] equates to 'help'
    let cmd = args._[0] || 'help'

    // if --version or --v is passed, it'll evaluate to true and this conditional will be entered
    if (args.version || args.v) {
        cmd = 'version'
    }

    if (args.help || args.h) {
        cmd = 'help'
    }

    if (args.today || args.t) {
        cmd = 'today'
    }
    
    /* Only load code for commands if the user actually called it instead of loading everything at once.
       Depending on command, pass args as parameter

       double hyphen flags always evaluate to true when parsed by minimist eg --help = {help: "true"} */

    switch (cmd) {
        case 'today':
            require('./cmds/today')(args)
            break

        case 'forecast':
            require('./cmds/forecast')(args)    
            break

        case 'help':
            require('./cmds/help')(args)
            break

        case 'version':
            require('./cmds/version')()
             break

        default:
            console.error(`"${cmd}" is not a valid command, STOOPID`)
            break
    }
}

