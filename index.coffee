"use strict"

fs = require "fs"
http = require "http"

times = 20

http
  .createServer (req, res) ->
    switch req.url
      when "/", "/index", "/index.html"
        res.writeHead 200,
          "content-type": "text/html"
        fs.readFile "./dist/index.html", (err, data) ->
          res.end data
      when "/download"
        console.log "start download"
        res.writeHead 200,
          # "Connection": "keep-alive"
          "Connection": "close"
          "Content-Type": "text/plain"
          "Content-Length": times
        [...Array(times)].reduce (promise) ->
          promise.then ->
            new Promise (resolve) ->
              setTimeout () ->
                res.write 'x'
                resolve()
              , 2000
        , Promise.resolve()
        .then ->
          res.end()
          console.log "done"
  .listen 8080, ->
    console.log "Start http server 8080"
