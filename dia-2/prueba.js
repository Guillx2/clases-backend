let count = 0; 

setInterval(() => {
    console.log(count);
    count++;
}, 1000);


//Esto hace un contador que aumenta en 1 cada 1 segundo (1000)
//(Un cronómetro)
/*
Para parar un programa usamos CRTL + C. 
Si esto no funciona, abrimos otro terminal y entramos a los 
procesos del ordenador con:
        ps -a 
Buscamos el proceso que queremos parar (por ejemplo node prueba.js)
y lo paramos así:
        kill numeroPIDdelProceso
*/
