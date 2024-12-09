import { prisma } from "../providers/prisma.provider.js";

export class generoService {

  static async getAll() {
    const generos = await prisma.genero.findMany();
    generos.sort((a, b) => a.id - b.id);  // Ordenar por ID de menor a mayor
    return generos;
  }

  static async getById({ id }) {
    return prisma.genero.findUnique({
      where: { id: parseInt(id) },
    });
  }

  static async create({ nombre }) {
    return prisma.genero.create({
      data: { nombre },
    });
  }

  static async update({ id, nombre }) {
    return prisma.genero.update({
      where: { id: parseInt(id) },
      data: { nombre },
    });
  }

  static async delete({ id }) {
    return prisma.genero.delete({
      where: { id: parseInt(id) },
    });
  }
}
