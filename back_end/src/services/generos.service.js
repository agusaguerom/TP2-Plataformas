import { prisma } from "../providers/prisma.provider.js";

export class generoService{


    static async getAll(){

        return prisma.genero.findMany();

    }



    static async create({nombre}){


     return  prisma.genero.create({
            data: { nombre },
          });
      
    }



    static async update({id, nombre}){


    return  prisma.genero.update({
            where: { id: parseInt(id) },
            data: { nombre },
          });


    }


    static async delete({ id }){


    return  prisma.genero.delete({
            where: { id: parseInt(id) },
          })


    }





}