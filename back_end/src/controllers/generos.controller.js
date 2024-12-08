import { GeneroDto } from "../dto/GeneroDTO.js";
import { generoService } from "../services/generos.service.js";

export class generosController {

static async getAll(req, res){
    try {
      const generos = await generoService.getAll();
      res.json(generos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


static async create(req, res){
    try {
      const { error, value } = GeneroDto.validate(req.body);
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const { nombre } = value;
  
      const nuevoGenero = await generoService.create({ nombre });

      res.status(201).json({
        message: "Género creado con éxito",
        genero: nuevoGenero,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }


static async update(req, res){
    try {
      const { id } = req.params;
      const { error, value } = GeneroDto.validate(req.body);
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const { nombre } = value;
  
      const generoActualizado = await generoService.update({id, nombre});
  
      res.json({
        message: "Género actualizado con éxito",
        genero: generoActualizado,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

static async delete(req, res){
    try {
      const { id } = req.params;
      await generoService.delete({ id });
      res.json({ message: "Género eliminado con éxito" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

}