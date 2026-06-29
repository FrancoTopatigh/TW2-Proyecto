import { Producto } from "../../../../modules/productos/interfaces/producto.interface";
import { ProductoRest } from "./producto.interface.rest";

export class ProductoMapper{
  static mapRestProductoToProductoFront(productoRest: ProductoRest): Producto{
      return {
        id: productoRest.id,
        nombre: productoRest.nombre,
        descripcion: productoRest.descripcion,
        clasificacion: productoRest.clasificacion,
        precio: productoRest.precio,
        stock: productoRest.stock,
        imagen: productoRest.imagen
      }
  }

  static mapRestProductoArrayToProductoArrayFront(productoRest: ProductoRest[]): Producto[]{
    return productoRest.map(this.mapRestProductoToProductoFront);
  }

  static mapProductoFrontToProductoRest(producto: Producto): any {
    return {
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      clasificacion: producto.clasificacion,
      precio: Number(producto.precio),
      stock: Number(producto.stock),
      imagen: producto.imagen
    };
  }

}
