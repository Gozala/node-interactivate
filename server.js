"use strict";

var shoe = require("shoe")
var http = require("http")
var repl = require("repl")
var vm = require("vm");
var util = require("util")
var Require = require("require-like")
var path = require("path")
var ecstatic = require("ecstatic")

var router = ecstatic(path.dirname(module.filename))

function host(session) {
  var module = { filename: path.join(process.cwd(), "interactive") }
  var context = vm.createContext(global)
  context.require = Require(module.filename, true)
  context.module = module;

  session.on("data", function(data) {
    var packet = JSON.parse(data)
    var result
    try {
      result = vm.runInContext(packet.source, context)
    } catch (error) {
      result = error
    }
    session.write(JSON.stringify({
      from: packet.to,
      message: util.inspect(result)
    }))
  })
}

function serve(port) {
  var server = http.createServer(router)
  shoe(host).install(server, "/interactivate")
  server.listen(port || 9000)
}
serve.host = host

module.exports = serve

if (require.main === module) serve()
