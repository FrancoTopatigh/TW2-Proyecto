import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Producto } from '../../interfaces/producto.interface';
import { ProductosService } from '../../../../api/services/productos/productos.service';
import { Subject,takeUntil } from 'rxjs';
import { CarritoService } from '../../../../api/services/carrito/carrito.service';
import { ProductoCardComponent } from '../../components/producto-card/producto-card.component';

@Component({
  selector: 'app-list-producto',
  imports: [ProductoCardComponent,RouterLink],
  templateUrl: './list-producto.component.html',
  styleUrl: './list-producto.component.css',
})
export class ListProductoComponent implements OnInit, OnDestroy {
  productos = signal<Producto[]>([]);
  productoService = inject(ProductosService);
  carritoService = inject(CarritoService);
  destroy$ = new Subject<void>();
  ngOnInit(): void {
    this.listarProductos()
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  listarProductos(){
    this.productoService.listProducto().pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      {
        next: (res: Producto[]) => {
          this.productos.set(res);
          console.log("¡LLEGÓ LA INFO DEL BACK, PA! Ojo el catálogo:", res);
        },
        error: (error) => {
          console.log("error pa")
        }
      }
    )
  }

  idProductoAEliminar: number | null = null;

  abrirModalEliminar(id: number) {
  this.idProductoAEliminar = id;
}

confirmarEliminar() {
    // 2. Controlamos que realmente exista un ID antes de llamar al servicio
    if (this.idProductoAEliminar !== null) {
      this.productoService.eliminarProducto(this.idProductoAEliminar).subscribe({
        next: () => {
          console.log("¡Producto borrado de la DB!");
          this.idProductoAEliminar = null; // Limpiamos la variable por seguridad
          this.listarProductos();
        },
        error: (err) => {
          console.error("Error al borrar producto", err);
        }
      });
    }
  }
}
