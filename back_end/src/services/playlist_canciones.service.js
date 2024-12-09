import { prisma } from "../providers/prisma.provider.js";

export class playlistCancionesService{


    static async getAll(){


        return prisma.playlist_cancion.findMany();


    }


    static async create({fk_playlist,fk_cancion}){

      return  prisma.playlist_cancion.create({
            data: {
              fk_playlist,
              fk_cancion,
            },
          });
      


    }


    static async delete( { id } ){

    return  prisma.playlist_cancion.delete({
            where: { id: id },
          });

    }


}