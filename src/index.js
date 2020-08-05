/**
 * @description
 * @date  2019/05/07.
 */

const optimist = require('optimist')
const fs = require('fs-extra')
const path = require('path')

let argv = optimist.argv

let commands = argv._

let clis = fs.readdirSync(path.resolve(__dirname, './cli/')).map(c => c.replace('.js', ''))
let cmd = clis.indexOf(commands[0]) !== -1 ? commands[0] : 'help'
argv.cwd = process.cwd()

const command = require('./cli/' + cmd)
command(argv)
