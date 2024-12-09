import { prisma } from "../providers/prisma.provider.js";


export class playlistService{


static async getAll(){

  return  prisma.playlist.findMany();

}

static async create({nombre, descripcion, fk_usuario}){


    return prisma.playlist.create({
        data: {
          nombre,
          descripcion,
          fk_usuario,
        },
      });
  



}


static async update({id, nombre, descripcion, fk_usuario}){


    return prisma.playlist.update({
        where: { id: parseInt(id) },
        data: {
          nombre,
          descripcion,
          fk_usuario,
        },
      });


}

static async delete({ id }){

  return  prisma.playlist.delete({
        where: { id: parseInt(id) },
      });

}


}