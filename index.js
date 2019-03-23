//Pasos a seguir para crear un webserver mediante "Node.js".

const http = require("http") //Variable (Constante) la cual REQUIERE o solicita el modulo HTTP.

const fs = require("fs") //Variable (Constante) la cual REQUIERE o solicita el modulo FS.

const path = require("path") //Variable la cual REQUIERE o solicita el modulo PATH, obtiene las extensiones de archivo y matchea en una lista de posibles archivos.

const form = require("querystring") //para poder leer los archivos querystring de los formularios completados.

const loki = require("lokijs") //Creadora automatica de Jsons.

const port = 80 //Puerto en el cual se alojara mi proyecto.

let noticias = null;

let db = new loki('noticias.json', {
    autoload: true,
    autosave: true, 
    autosaveInterval: 4000,
    autoloadCallback : function(){
        noticias = db.getCollection("noticias")
        if ( noticias === null ){
            noticias = db.addCollection("noticias")
        }
    
    }
})

http.createServer(function(request, response){

    let dir = "./public"  //Carpeta del proyecto para meter el frontend estatico (HTML imagenes etc)

    let file = (request.url == "/") ? "index.html" : request.url  //Archivo solicitado.

        if( request.method == "POST" && file == "/enviar"){
            //ACA HAY QUE PROCESAR LOS DATOS DEL FORMULARIO
            request.on("data", function(body){

                let datos = body.toString()
                    datos = form.parse(datos)

                noticias.insert(datos)

                console.log( datos )

                response.end("mira el archivo noticias.json")
            })
        }

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

    fs.readFile(dir + file, function(error, content){ //<-- "Intentar" leer el recurso solicitado.

        if( error ){ //<-- Si hay un error...
            response.end("Archivo no encontrado :(")
        } else{ //<-- Si lo encontro...
            response.writeHead(200, { "Content-Type" : contentType })
            response.end(content)
        }

    })

}).listen(port)