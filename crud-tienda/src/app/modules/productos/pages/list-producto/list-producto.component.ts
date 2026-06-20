import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Producto } from '../../interfaces/producto.interface';
import { ProductosService } from '../../../../api/services/productos/productos.service';
import { Subject,takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-producto',
  imports: [RouterLink],
  templateUrl: './list-producto.component.html',
  styleUrl: './list-producto.component.css',
})
export class ListProductoComponent implements OnInit, OnDestroy {
  productos = signal<Producto[]>([]);
  productoService = inject(ProductosService);
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

}
