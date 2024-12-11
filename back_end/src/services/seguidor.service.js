import { prisma } from "../providers/prisma.provider.js";


export class seguidorService{



static async getAll(){


    return prisma.seguidor.findMany();


}









}