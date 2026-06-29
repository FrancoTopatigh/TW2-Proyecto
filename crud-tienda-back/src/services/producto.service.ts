import { Producto } from '../models/producto.model.js';
import { ProductoRepository } from '../repository/producto.repository.js';

export class ProductoService {
    constructor(private productoRepository: ProductoRepository) { }

    async TraerProductos() {
        return await this.productoRepository.TraerProductos();
    }

    async TraerProductoPorId(id: number) {
        if (!id || id <= 0) {
            throw new Error('ID inválido');
        }
        return await this.productoRepository.TraerProductoPorId(id);
    }

    async CrearProducto(data: { nombre: string, descripcion: string, clasificacion: string, precio: number, stock: number, creadoPor?: string }) {
        if (!data.nombre || data.nombre.trim() === "") {
            throw new Error('El nombre es obligatorio y no puede estar vacío');
        }
        if (!data.descripcion || data.descripcion.trim() === "") {
            throw new Error('La descripción es obligatoria');
        }
        if (!data.clasificacion || data.clasificacion.trim() === "") {
            throw new Error('La clasificación es obligatoria');
        }
        if (data.precio <= 0) {
            throw new Error('El precio debe ser un número mayor a cero');
        }
        if (data.stock < 0) {
            throw new Error('El stock no puede ser un número negativo');
        }
        return await this.productoRepository.CrearProducto(data);
    }

    async ActualizarProducto(id: number, data: { nombre?: string, descripcion?: string, clasificacion?: string, precio?: number, stock?: number }) {

        if (!id || id <= 0) {
            throw new Error('El ID del producto no es válido');
        }

        if (data.nombre !== undefined && data.nombre.trim() === "") {
            throw new Error('El nombre modificado no puede estar vacío');
        }

        if (data.precio !== undefined && data.precio <= 0) {
            throw new Error('El precio modificado debe ser mayor a cero');
        }

        if (data.stock !== undefined && data.stock < 0) {
            throw new Error('El stock modificado no puede ser negativo');
        }

        return await this.productoRepository.ActualizarProducto(id, data);
    }

    async EliminarProducto(id: number) {
        try {
            return await this.productoRepository.EliminarProducto(id);
        } catch (error: any) {
            if (error.code === 'P2025') {
                throw new Error('ProductoNoExiste')
            }
            throw error;
        }
    }
}