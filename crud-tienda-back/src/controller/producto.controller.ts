import { type Request, type Response } from 'express'
import { ProductoService } from '../services/producto.service.js';
import { ProductoRepository } from '../repository/producto.repository.js';
import { Producto } from '../models/producto.model.js';

const productoRepository = new ProductoRepository();
const productoService = new ProductoService(productoRepository);

export class ProductoController {
    constructor() { }

    public async TraerProductos(req: Request, res: Response) {
        try {
            const productos = await productoService.TraerProductos();
            res.json(productos);
        } catch (error) {
            res.status(500).json({ error: 'Error al traer los productos' });
        }
    }

    public async TraerProductoPorId(req: Request, res: Response) {

        try {
            const id: number = Number(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json("ID inválido")
            }

            const producto = await productoService.TraerProductoPorId(id);

            if (producto) {
                res.json(producto);
            }
            else {
                res.status(404).json({ error: 'Producto no encontrado' });
            }

        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async CrearProducto(req: Request, res: Response) {
        const data = req.body;

        const nuevoProducto = await productoService.CrearProducto(data);
        try {
            res.status(201).json(nuevoProducto);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async ActualizarProducto(req: Request, res: Response) {
        const id: number = Number(req.params.id);
        const data = req.body;

        if (isNaN(id)) {
            return res.status(400).json("ID inválido")
        }

        try {
            const productoActualizado = await productoService.ActualizarProducto(id, data);

            res.json(productoActualizado);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async EliminarProducto(req: Request, res: Response) {
        const id: number = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }
        try {
            const productoEliminado = await productoService.EliminarProducto(id);
            res.json(productoEliminado);
        } catch (error: any) {
            if (error.message === 'ProductoNoExiste') {
                res.status(404).json({ error: 'Producto no encontrado' });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }
}