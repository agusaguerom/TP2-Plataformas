
import express, { response } from "express";

const app = express(); // Inicializa la aplicacion

const PORT = 5000; // puerto

app.get("/", (req, resp) => {

resp.json({mensaje: "hola mundo",
fecha: new Date().toLocaleDateString(),
cantidad: 150



});

}) // Ruta raiz


app.get("/info", (req, res) => {

res.json({

    mensaje: "Información del servidor",
    version: "0.1.0",
    auto: "Pablito",
    framework: "Express",


});



});



app.listen(PORT, () => {

console.log(`Server running on http://localhost:${PORT}`);

})