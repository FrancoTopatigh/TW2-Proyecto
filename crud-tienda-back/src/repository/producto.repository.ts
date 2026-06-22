import { Producto } from "../models/producto.model.js";
import { prisma } from '../prisma.js'

export class ProductoRepository {

    async TraerProductos() {
        const productos = await prisma.producto.findMany();
        return productos;
    }

    async TraerProductoPorId(id: number) {
        const producto = await prisma.producto.findUnique({
            where: {
                id: id
            }
        });
        return producto;
    }

    async CrearProducto(data: { nombre: string, descripcion: string, clasificacion: string, precio: number, stock: number, creadoPor?: string }) {
        const nuevoProducto = await prisma.producto.create({
            data
        });
        return nuevoProducto;
    }

    async ActualizarProducto(id: number, data: { nombre?: string, descripcion?: string, clasificacion?: string, precio?: number, stock?: number }) {
        const productoActualizado = await prisma.producto.update({
            where: {
                id: id
            },
            data
        });
        return productoActualizado;
    }

    async EliminarProducto(id: number) {
        const productoEliminado = await prisma.producto.delete({
            where: {
                id: id
            }
        });
        return productoEliminado;
    }
}
