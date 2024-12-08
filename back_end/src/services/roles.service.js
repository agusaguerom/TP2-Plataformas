import { prisma } from "../providers/prisma.provider.js"


export class RolesService{

static async getAll(){


return prisma.rol.findMany();


}


static async create({ nombre }){

    prisma.rol.create({
        data: {
            nombre
        }
    });


}


static async update({ nombre, id }) {

  return  prisma.rol.update({
        where: { id: parseInt(id) },
        data: {
            nombre
        }
    });



}


static async delete({ id }) {

   return prisma.rol.delete({
        where: { id: parseInt(id) }
    });

}



}