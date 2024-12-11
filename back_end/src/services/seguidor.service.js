import { prisma } from "../providers/prisma.provider.js";


export class seguidorService{



static async getAll(){


    return prisma.seguidor.findMany();


}

static async cantidadSeguidores({ idArtista }) {


    return prisma.seguidor.count({
        where: {
          fk_artista: idArtista, 
        },
      });


}







}