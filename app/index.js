//ES8: import http from "./http"
let http = require("http")

http.createServer(function(request, response){

    var saludo = "Hola Mundo desde <strong>Node.js</strong>!"
    response.setHeader("Content-Type","text/html")
    response.write(saludo)
    response.end(" Usted quiere este recurso: " + request.url)

}).listen(2000)