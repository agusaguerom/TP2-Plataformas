import { ArtistaDto } from "../dto/ArtistaDTO.js";
import { artistaService } from "../services/artistas.service.js";


export class artistaController{


static async getAll(req, res){
    try {
      const artistas = await artistaService.getAll();
      res.json(artistas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }



static async create(req, res){
    try {
      const { error, value } = ArtistaDto.validate(req.body);
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const { nombre, descripcion, image, fk_genero, fk_usuario } = value;
  
      const nuevoArtista = await artistaService.create({nombre,descripcion,image,fk_genero,fk_usuario});
  
      res.status(201).json({
        message: "Artista creado con éxito",
        artista: nuevoArtista,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update (req, res){
    try {
      const { id } = req.params;
      const { error, value } = ArtistaDto.validate(req.body);
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const { nombre, descripcion, image, fk_genero, fk_usuario } = value;
  
      const artistaActualizado = await artistaService.update({id,nombre,descripcion,image,fk_genero,fk_usuario});
  
      res.json({
        message: "Artista actualizado con éxito",
        artista: artistaActualizado,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }


  static async delete(req, res){
    try {
      const { id } = req.params;
      await artistaService.delete({id});
      res.json({ message: "Artista eliminado con éxito" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }



}