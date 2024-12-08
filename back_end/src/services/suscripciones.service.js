import { prisma } from "../providers/prisma.provider.js";

export class suscripcionService{


   static async getAll(){

        return prisma.suscripcion.findMany();

    }


  static  async create({nombre, precio_mensual, duracion_dias}) {

   return   prisma.suscripcion.create({
            data: {
              nombre,
              precio_mensual,
              duracion_dias,
            },
          });


    }



  static  async update({id, nombre, precio_mensual, duracion_dias}){

    return prisma.suscripcion.update({
            where: { id: parseInt(id) },
            data: {
              nombre,
              precio_mensual,
              duracion_dias,
            },
          });
    }


    static async delete({ id }) {


      return  prisma.suscripcion.delete({
            where: { id: parseInt(id) },
          });

    }



}