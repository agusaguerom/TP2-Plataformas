import { prisma } from "../providers/prisma.provider.js";

export class albumsService{


static async getAll(){


    return prisma.album.findMany();


}


static async create({nombre,publicacion,descripcion,fk_artista}){

 return   prisma.album.create({
        data: {
          nombre,
          publicacion,
          descripcion,
          fk_artista,
        },
      });
}

static async update({id, nombre, publicacion, descripcion, fk_artista}){

 return   prisma.album.update({
        where: { id },
        data: {
          nombre,
          publicacion,
          descripcion,
          fk_artista,
        },
      });

}

static async delete({id}){

 return   prisma.album.delete({
        where: { id },
      });
    

}






}


















