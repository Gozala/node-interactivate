"use strict";

var Editor = require("interactivate/core")
var host = require("./host")

var editor = Editor(document.body, {
  value: "process.version\n\n// =>\n\n",
  electricChars: true,
  autofocus: true,
  theme: "solarized dark",
  mode: "javascript",
  extraKeys: {
    "Tab": function indent(editor) {
      if (!editor.getOption("indentWithTabs")) {
        var size = editor.getOption("indentUnit")
        var indentation = Array(size + 1).join(" ")
        editor.replaceSelection(indentation, "end")
      }
    }
  }
})

host(editor).on("connect", function() {
  editor.setValue(editor.getValue())
})

global.editor = editor
