import { suscripcionService } from "../services/suscripciones.service.js";
import { SuscripcionDto } from "../dto/SuscripcionDTO.js";

export class suscripcionesController {


  static async getAll(req, res) {
    try {
      const suscripciones = await suscripcionService.getAll();
      suscripciones.sort((a, b) => a.id - b.id);  // Ordenar por ID de menor a mayor
      res.json(suscripciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  


static async getById(req, res) {
  try {
    const { id } = req.params;
    const suscripcion = await suscripcionService.getById({id})
    if (!suscripcion) {
      return res.status(404).json({ message: "Suscripción no encontrada" });
    }
    res.json(suscripcion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}




static async create(req, res) {
    try {
      const { error, value } = SuscripcionDto.validate(req.body);
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const { nombre, precio_mensual, duracion_dias } = value;
  
      const nuevaSuscripcion = await suscripcionService.create({nombre, precio_mensual, duracion_dias});
  
      res.status(201).json({
        message: "Suscripción creada con éxito",
        suscripcion: nuevaSuscripcion,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

static  async update(req, res)  {
    try {
      const { id } = req.params;
      const { error, value } = SuscripcionDto.validate(req.body);
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const { nombre, precio_mensual, duracion_dias } = value;
  
      const suscripcionActualizada = await suscripcionService.update({id, nombre, precio_mensual, duracion_dias});
  
      res.json({
        message: "Suscripción actualizada con éxito",
        suscripcion: suscripcionActualizada,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }






 static async delete(req, res) {
    try {
      const { id } = req.params;
      await suscripcionService.delete({id})
      res.json({ message: "Suscripción eliminada con éxito" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }








    
}