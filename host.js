"use strict";

function host(editor) {
  var shoe = require("shoe")
  var session = shoe("/interactivate")

  session.on("data", function send(packet) {
    var event = document.createEvent("CustomEvent")
    event.initCustomEvent("client", false, true, JSON.parse(packet))
    window.dispatchEvent(event)
  })

  window.addEventListener("server", function(event) {
    session.write(JSON.stringify(event.detail))
  }, false)

  return session
}

module.exports = host
