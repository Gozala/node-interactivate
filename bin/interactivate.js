#!/usr/bin/env node

var server = require("../server")
var port = parseInt(process.argv[2], 10) || 9000
server(port)

console.log("Interactivate is running at http://localhost:" + port + "/?" + process.cwd())
