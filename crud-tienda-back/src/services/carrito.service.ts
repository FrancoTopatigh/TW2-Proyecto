import { BehaviorSubject } from 'rxjs';

// Definimos cómo se ve un producto adentro del carrito
export interface ProductoCarrito {
  productoId: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

export class CarritoService {
  // BehaviorSubject es una variable "reactiva". Avisa a la página web automáticamente si hay cambios.
  private carrito = new BehaviorSubject<ProductoCarrito[]>([]);
  carritoActual$ = this.carrito.asObservable();

  constructor() {
    // Cuando el usuario entra a la página, buscamos si dejó algo guardado en el navegador de antes
    const carritoGuardado = localStorage.getItem('carrito_compras');
    if (carritoGuardado) {
      this.carrito.next(JSON.parse(carritoGuardado));
    }
  }

  // 1. Método para agregar un producto (o sumar cantidad si ya existe)
  agregarProducto(producto: ProductoCarrito) {
    const carritoActual = this.carrito.getValue();
    const indice = carritoActual.findIndex((p : ProductoCarrito) => p.productoId === producto.productoId);

    if (indice !== -1) {
      // Si el producto ya está en el carrito, le sumamos la cantidad
      carritoActual[indice].cantidad += producto.cantidad;
    } else {
      // Si no está, lo agregamos a la lista
      carritoActual.push(producto);
    }

    this.actualizarYGuardar(carritoActual);
  }

  // 2. Método para eliminar un producto del tachito
  eliminarProducto(productoId: number) {
    const carritoActual = this.carrito.getValue();
    const carritoFiltrado = carritoActual.filter((p : ProductoCarrito) => p.productoId !== productoId);
    this.actualizarYGuardar(carritoFiltrado);
  }

  // 3. Método para vaciar todo (ideal para usar cuando la compra fue exitosa)
  vaciarCarrito() {
    this.actualizarYGuardar([]);
  }

  // 4. Método matemático para sacar la plata total
  obtenerTotal(): number {
    const carritoActual = this.carrito.getValue();
    return carritoActual.reduce((total: number, producto: ProductoCarrito) => total + (producto.precio * producto.cantidad), 0);
  }

  // Función interna que actualiza el estado y guarda en el disco duro del navegador (localStorage)
  private actualizarYGuardar(nuevoCarrito: ProductoCarrito[]) {
    this.carrito.next(nuevoCarrito);
    localStorage.setItem('carrito_compras', JSON.stringify(nuevoCarrito));
  }
}