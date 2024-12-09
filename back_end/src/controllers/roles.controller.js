import { RolDto } from "../dto/RolDTO.js";
import { RolesService } from "../services/roles.service.js";

export class RolesController {

static   async getAll(req, res){
        try {
            const roles = await RolesService.getAll();
            res.json(roles);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


static  async create(req, res)  {
        try {
            const { error, value } = RolDto.validate(req.body);
    
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
    
            const { nombre } = value;
    
            const newRole = await RolesService.create({nombre});


            res.status(201).json({
                message: "Rol creado con éxito",
                rol: newRole
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    
    
static async updateRol(req, res)  {
    const { id } = req.params;
    const { error, value } = RolDto.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const { nombre } = value;

        const updatedRole = await RolesService.update({ nombre, id });

        res.status(200).json({
            message: "Rol actualizado",
            rol: updatedRole
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


static async delete(req, res) {
    const { id } = req.params;

    try {
        await RolesService.delete({ id });

        res.status(200).json({ message: "Rol eliminado con éxito" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


}