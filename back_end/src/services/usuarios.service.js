import { prisma } from "../providers/prisma.provider.js";

export class UsuariosService{


    static async getAll(){

        return prisma.usuario.findMany({
            include: {
              suscripcion: true,
              rol: true,
            },
          });


    }


    static async getById({ id }){

      return  prisma.usuario.findUnique({
            where: { id: id },
            include: {
              suscripcion: true,
              rol: true,
            },
          });

    }



    static async newUser({nombre, apellido, correo, hashedPassword, fk_suscripcion, fk_rol }){

     return   prisma.usuario.create({
            data: {
              nombre,
              apellido,
              correo,
              password: hashedPassword,
              fk_suscripcion,
              fk_rol,
            },
          });


    }


    static async newArtist({nombreArtista, descripcion, image, fk_genero,fk_usuario}){
        
     return   prisma.artista.create({
        data: {
          nombre: nombreArtista,
          descripcion,
          image,
          fk_genero,
          fk_usuario: fk_usuario,
        },
      });
    
    }


    static async updateAdmin({ id, data }) {

     return   prisma.usuario.update({
            where: { id: id },
            data,
            include: {
              suscripcion: true,
              rol: true,
            },
          });


    }


    static async updateUsers({id, data}){

        return prisma.usuario.update({
            where: { id: id },
            data,
            include: {
              suscripcion: true,
              rol: true,
            },
          });


    }


    static async update({id, data}){

     return prisma.usuario.update({
            where: { id: id },
            data,
            include: {
              suscripcion: true,
              rol: true,
            },
          });

    }


}