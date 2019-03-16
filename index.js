//Pasos a seguir para crear un webserver mediante "Node.js".

const http = require("http") //Variable (Constante) la cual REQUIERE o solicita el modulo HTTP.
const fs = require("fs") //Variable (Constante) la cual REQUIERE o solicita el modulo FS.
const path = require("path") //Variable la cual REQUIERE o solicita el modulo PATH, obtiene las extensiones de archivo y matchea en una lista de posibles archivos.

const port = 80 //Puerto en el cual se alojara mi proyecto.

http.createServer(function(request, response){
    let dir = "public/"  //Carpeta del proyecto.

    let file = (request.url == "/") ? "index.html" : request.url  //Archivo solicitado.
    let ext = String( path.extname(file) ).toLowerCase() //Extensiones ".html", ".css", ".js", etc.
    let tipos = {
        ".html"	: "text/html",
        ".js"	: "text/javascript",
        ".css"	: "text/css",
        ".txt" 	: "text/plain",
        ".json"	: "application/json",
        ".png"	: "image/png",
        ".jpg"	: "image/jpg",
        ".gif"	: "image/gif",
        ".ico"	: "image/x-icon",
        ".wav"	: "audio/wav",
        ".mp4"	: "video/mp4",
        ".woff"	: "application/font-woff",
        ".ttf"	: "application/font-ttf",
        ".eot"	: "application/vnd.ms-fontobject",
        ".otf"	: "application/font-otf",
        ".svg"	: "application/image/svg+xml"
    }

    let contentType = tipos[ext] || "application/octet-stream" //Simplificacion de "if" con doble condicionante (si algo puede ser "A" entonces mostrar algo, sino mostrar "B")

    console.log("Archivo solicitado:" + dir + file)


    fs.readFile(dir + file, function(error, content){ //<-- "Intentar" leer el recurso solicitado.

        if( error ){ //<-- Si hay un error...
            response.end("Archivo no encontrado :(")
        } else{ //<-- Si lo encontro...
            response.writeHead(200, { "Content-Type" : contentType })
            response.end(content)
        }

    })


}).listen(port)

