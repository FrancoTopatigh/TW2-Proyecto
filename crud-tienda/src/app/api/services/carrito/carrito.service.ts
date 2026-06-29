import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ProductoCarrito {
  productoId: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito = new BehaviorSubject<ProductoCarrito[]>([]);
  carritoActual$ = this.carrito.asObservable();

  constructor() {
    const carritoGuardado = localStorage.getItem('carrito_compras');
    if (carritoGuardado) {
      this.carrito.next(JSON.parse(carritoGuardado));
    }
  }

  agregarProducto(producto: ProductoCarrito) {
    const carritoActual = this.carrito.getValue();
    const indice = carritoActual.findIndex((p: ProductoCarrito) => p.productoId === producto.productoId);

    if (indice !== -1) {
      carritoActual[indice].cantidad += producto.cantidad;
    } else {
      carritoActual.push(producto);
    }
    this.actualizarYGuardar(carritoActual);
  }

  eliminarProducto(productoId: number) {
    const carritoActual = this.carrito.getValue();
    const carritoFiltrado = carritoActual.filter((p: ProductoCarrito) => p.productoId !== productoId);
    this.actualizarYGuardar(carritoFiltrado);
  }

  vaciarCarrito() {
    this.actualizarYGuardar([]);
  }

  obtenerTotal(): number {
    const carritoActual = this.carrito.getValue();
    return carritoActual.reduce((total: number, producto: ProductoCarrito) => total + (producto.precio * producto.cantidad), 0);
  }

  // Método para el contador + y - del carrito visual
  cambiarCantidad(productoId: number, cambio: number) {
    const carritoActual = this.carrito.getValue();
    const indice = carritoActual.findIndex((p: ProductoCarrito) => p.productoId === productoId);

    if (indice !== -1) {
      carritoActual[indice].cantidad += cambio;

      // Si la cantidad llega a 0 o menos, borramos el producto automáticamente
      if (carritoActual[indice].cantidad <= 0) {
        this.eliminarProducto(productoId);
        return;
      }

      this.actualizarYGuardar(carritoActual);
    }
  }

  private actualizarYGuardar(nuevoCarrito: ProductoCarrito[]) {
    this.carrito.next(nuevoCarrito);
    localStorage.setItem('carrito_compras', JSON.stringify(nuevoCarrito));
  }
}
