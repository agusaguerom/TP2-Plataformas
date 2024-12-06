import express, { response } from "express";
import cors from "cors";
import usuariosRoutes from "./routes/usuarios.routes.js"

const app = express(); // Inicializa la aplicacion
const PORT = 5000; // puerto


app.use(cors());
app.use(express.json())

app.use("/api", usuariosRoutes)



app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
}
)