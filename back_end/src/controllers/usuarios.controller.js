import { createUserDto, updateUserAdminDto, updateUserDto } from "../dto/UserDTO.js";
import { UsuariosService } from "../services/usuarios.service.js";
import bcrypt from "bcrypt";

export class UsuariosController{


    static async getAll(req, res) {
        try {
          const usuarios = await UsuariosService.getAll();
          res.json(usuarios);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }


    static async getById(req, res) {
        const { id } = req.params;
        console.log("GET /usuarios/:id - ID recibido:", id); // Log para verificar el ID recibido
        try {
          const usuario = await UsuariosService.getById({id})
          if (usuario) {
            res.json(usuario);
          } else {
            res.status(404).json({ error: "Usuario no encontrado" });
          }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }


      static async register(req, res) {
        try {
            console.log("Datos recibidos del frontend:", req.body);
            const { error, value } = createUserDto.validate(req.body);
    
            if (error) {
                console.log("Error de validación:", error.details);
                return res.status(400).json({ error: error.details[0].message });
            }
    
            const {
                nombre,
                apellido,
                correo,
                password,
                fk_suscripcion,
                fk_rol,
                artistaInfo,
            } = value;
    
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const newUser = await UsuariosService.newUser({
                nombre,
                apellido,
                correo,
                hashedPassword,
                fk_suscripcion,
                fk_rol,
            });
    
            if (fk_rol === 2 && artistaInfo) {
                const { nombreArtista, descripcion, image, fk_genero } = artistaInfo;
    
                const nuevoArtista = await UsuariosService.newArtist({
                    nombreArtista,
                    descripcion,
                    image,
                    fk_genero,
                    fk_usuario: newUser.id, 
                });
    
                return res.status(201).json({
                    message: "Usuario y Artista creados con éxito",
                    user: newUser,
                    artista: nuevoArtista,
                });
            }
    
            res.status(201).json({
                message: "Usuario creado con éxito",
                user: newUser,
            });
        } catch (error) {
            console.error("Error al crear el usuario o artista:", error);
            res.status(400).json({ error: error.message });
        }
    }



static async updateAdmin(req, res){
    const { id } = req.params;
    console.log("PUT /admin/usuarios/:id - ID recibido:", id); 
    const { error, value } = updateUserAdminDto.validate(req.body);
  
    if (error) {
      console.log("Error de validación:", error.details);
      return res.status(400).json({ error: error.details[0].message });
    }
  
    try {
      console.log("Datos recibidos para actualización por admin:", value);
      const { nombre, apellido, correo, password, fk_suscripcion, fk_rol } = value;
  
      const data = {
        nombre,
        apellido,
        correo,
        fk_suscripcion,
        fk_rol,
      };
  
      if (password) {
        data.password = await bcrypt.hash(password, 10);
      }
  
      const updatedUser = await UsuariosService.updateAdmin({id, data});
  
      res.status(200).json({
        message: "Usuario actualizado por admin",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error al actualizar el usuario por admin:", error);
      res.status(400).json({ error: error.message });
    }
  }



  static async updateUsers(req, res) {
    const { id } = req.params;
    console.log("PUT /usuarios/actualizar/:id - ID recibido:", id); // Log para verificar el ID recibido
    const { error, value } = updateUserDto.validate(req.body);
  
    if (error) {
      console.log("Error de validación:", error.details);
      return res.status(400).json({ error: error.details[0].message });
    }
  
    try {
      console.log("Datos validados para actualización:", value);
      const { nombre, apellido, correo, fk_suscripcion } = value;
  
      const data = {
        nombre,
        apellido,
        correo,
        fk_suscripcion,
      };
  
      const updatedUser = await UsuariosService.updateUsers({id, data});
  
      res.status(200).json({
        message: "Usuario actualizado con rol 1 o 2",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error al actualizar el usuario con rol 1 o 2:", error);
      res.status(400).json({ error: error.message });
    }
  }


 static async update (req, res) {
    const { id } = req.params;
    console.log("PUT /usuarios/actualizar-rol3/:id - ID recibido:", id); // Log para verificar el ID recibido
    const { error, value } = updateUserAdminDto.validate(req.body);
  
    if (error) {
      console.log("Error de validación:", error.details);
      return res.status(400).json({ error: error.details[0].message });
    }
  
    try {
      console.log("Datos validados para actualización:", value);
      const { nombre, apellido, correo, password, fk_suscripcion, fk_rol } = value;
  
      const data = {
        nombre,
        apellido,
        correo,
        password,
        fk_suscripcion,
        fk_rol,
      };
  
      const updatedUser = await UsuariosService.update({id, data});
  
      res.status(200).json({
        message: "Usuario actualizado con rol 3",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error al actualizar el usuario con rol 3:", error);
      res.status(400).json({ error: error.message });
    }
  }




}


