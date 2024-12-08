import { prisma } from "../providers/prisma.provider.js";


export class artistaService{


static async getAll(){


    return prisma.artista.findMany();


}

static async create({nombre, descripcion, image, fk_genero, fk_usuario}){

  return  prisma.artista.create({
        data: {
          nombre,
          descripcion,
          image,
          fk_genero,
          fk_usuario,
        },
      });


}


static async update({id,nombre,descripcion,image,fk_genero,fk_usuario}){

  return  prisma.artista.update({
        where: { id: id },
        data: {
          nombre,
          descripcion,
          image,
          fk_genero,
          fk_usuario,
        },
      });


}


static async delete({id}){
    
    
  return prisma.artista.delete({
        where: { id: id },
      });


}




}