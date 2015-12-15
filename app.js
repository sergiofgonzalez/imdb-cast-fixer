"use strict";

var path = require("path");
var http = require("http");
var fs = require("fs");
var log4js = require("log4js");
var logger = log4js.getLogger();

var app = http.createServer(function(req, res) {
  logger.debug("HTTP request received for url:", req.url);

  var url = req.url === "/" ? "/index.html" : req.url;

  var filename = path.join(process.cwd(), "build" + url);

  logger.debug("Returning file: ", filename);
  fs.readFile(filename, getResponseHeaders(filename), function(err, html) {
    res.writeHead(200);
    res.end(html);
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  logger.debug("Listening for HTTP requests on port:", port);
});

function getResponseHeaders(filename) {
  logger.debug("computing response headers for", filename);
  var headersHolder;
  switch (path.extname(filename)) {
    case "html":
      headersHolder = {encoding: "utf8", "Content-Type": "text/html"};
      break;

    case ".js" :
      headersHolder = {encoding: "utf8", "Content-Type": "text/javascript"};
      break;

    case ".css" :
      headersHolder = {encoding: "utf8", "Content-Type": "text/css"};
      break;

    case ".png" :
      headersHolder = {"Content-Type": "image/png"};
      break;

    default:
      headersHolder = {encoding: "utf8"};
  }
  logger.debug("response headers for " + filename + ": ", headersHolder);
  return headersHolder;
}
