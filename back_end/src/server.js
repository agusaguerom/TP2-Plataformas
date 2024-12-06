import express, { response } from "express";
import usuariosRoutes from "./routes/usuarios.routes.js"
import suscripcionesRoutes from "./routes/suscripciones.routes.js"; 

const app = express(); 
const PORT = 5000; 



app.use(express.json())

app.use("/api", usuariosRoutes)
app.use("/api", suscripcionesRoutes);



app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
}
)