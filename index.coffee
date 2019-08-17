"use strict"

fs = require "fs"
http = require "http"

http
  .createServer (req, res) ->
    switch req.url
      when "/", "/index", "/index.html"
        res.writeHead 200,
          "content-type": "text/html"
        fs.readFile "./dist/index.html", (err, data) ->
          res.end data
      when "/download"
        res.writeHead 200,
          "Connection": "keep-alive"
          "content-type": "text/plain"
          "content-length": "5"
        [...Array(5)].reduce (promise, _, i) ->
          promise.then ->
            new Promise (resolve) ->
              setTimeout () ->
                res.write String(i)
                resolve()
              , 3000
        , Promise.resolve()
        .then -> res.end()
  .listen 8080, ->
    console.log "Start http server 8080"
