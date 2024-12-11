import { seguidorService } from "../services/seguidor.service.js";


export class seguidorController{



    static async getAll(req, res) {


        try {
            const seguidores = await seguidorService.getAll();
            res.json(seguidores);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
        
  



    }



    static async getCantidadSeguidores(req, res) {

      const { idArtista } = req.params; 

      
      try {
        const cantidadSeguidores = await seguidorService.cantidadSeguidores({ idArtista });


        res.json({ cantidadSeguidores }); 
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    

    }











}