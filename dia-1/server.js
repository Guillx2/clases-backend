'use strict';

const http = require('http');

let count = 1;

const handlePetition = (request, response) => {
    //leer la request (petición) 
    //escribir la response (respuesta)

const message = {
    message: "HOLA DESDE NODE",
    petitions: count++,
    date: new Date().toISOString(),
};

    response.statusCode = 200;
    response.setHeader("Content-type", "application/json");
    response.end(JSON.stringify(message));
}

const server = http.createServer(handlePetition);

server.listen(3000, "127.0.0.1");

