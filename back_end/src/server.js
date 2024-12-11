import express from "express";
import cors from 'cors';
import usuariosRoutes from "./routes/usuarios.routes.js";
import suscripcionesRoutes from "./routes/suscripciones.routes.js";
import artistasRoutes from "./routes/artistas.routes.js";
import generosRoutes from "./routes/generos.routes.js";
import albumsRoutes from "./routes/albums.routes.js";
import cancionesRoutes from "./routes/canciones.routes.js";
import playlistsRoutes from "./routes/playlists.routes.js";
import playlistCancionesRoutes from "./routes/playlist_canciones.routes.js";
import usuarioRoutes from './routes/usuarios.routes.js';
import rolRoutes from './routes/roles.routes.js';
import seguidorRoutes from "./routes/seguidor.routes.js"

const app = express();
app.use(cors());
const PORT = 5000;

app.use(express.json());

app.use("/api", usuariosRoutes);
app.use("/api", suscripcionesRoutes);
app.use("/api", artistasRoutes);
app.use("/api", generosRoutes);
app.use("/api", albumsRoutes);
app.use("/api", cancionesRoutes);
app.use("/api", playlistsRoutes);
app.use("/api", playlistCancionesRoutes);
app.use('/api', rolRoutes);
app.use("/api", seguidorRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
