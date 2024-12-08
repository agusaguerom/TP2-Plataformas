import { prisma } from "../providers/prisma.provider.js";

export class cancionesService{


static async getAll(){


    return prisma.cancion.findMany();


}


static async create({nombre,duracion,fk_album,fk_genero,fk_artista}){


    return prisma.cancion.create({
        data: {
          nombre,
          duracion,
          fk_album,
          fk_genero,
          fk_artista,
        },
      });
  


}


static async update({id, nombre, duracion, fk_album, fk_genero, fk_artista}){

return prisma.cancion.update({
    where: { id },
    data: {
      nombre,
      duracion,
      fk_album,
      fk_genero,
      fk_artista,
    },
  });

}


  static async delete({ id }){

   return prisma.cancion.delete({
        where: { id },
      });


  }






}