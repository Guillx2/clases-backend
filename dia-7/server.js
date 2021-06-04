// Crear servidor con módulos nativos de node

require("dotenv").config();
const http = require("http");

const { html } = require("./components");

//Creo un servidor HTTP
const server = http.createServer();

//Configuro una función que se ejecutará en cada petición
server.on("request", (request, response) => {
  const url = request.url;
  const method = request.method;
  // const headers = request.headers;

  //Esto sería lo mismo que lo anterior pero en 1 sola variable:
  // const {url, method, headers} = request;

  if (url === "/" && method === "GET") {
    //Respuesta a /
    response.statusCode = 200;
    response.setHeader("Content-type", "text/html");

    response.end(
      html({
        title: "Bienvenidos a mi web",
        content: "<p>Eres mi visitante favorito</p>",
      })
    );
  } else if (url === "/noticias" && method === "GET") {
    //Respuesta a /noticias
    response.statusCode = 200;
    response.setHeader("Content-type", "text/html");

    response.end(
      html({
        title: "Bienvenidos a la sección NOTICIAS",
        content:
          "<p>Hoy pasaron muchas cosas y aquí te las contamos porque es la sección noticias, aunque no te voy a contar nada porque esto es solo una prueba jajja salu2</p>",
      })
    );
  } else {
    //Respuesta cuando no hay otra respuesta
    response.statusCode = 404;
    response.setHeader("Content-type", "text/html");

    response.end("Not Found");
  }
});
/* 
  //Defino una respuesta genérica:
  //El statusCode 200 es el OK
  response.statusCode = 200;
  response.setHeader("Content-type", "text/html");
  response.end(`
    <html> 
        <head>
            <meta charset="UTF-8" />
             <title>Mi primer servidor web</title>
        </head>
        <body>
            <h1>Mi primer servidor web</h1> 
        </body>
    </html>
  `);
}); */

//Pongo el servidor a escuchar
const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
