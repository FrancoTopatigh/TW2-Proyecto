import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../../../api/services/productos/productos.service';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-create-producto',
  imports: [FormsModule],
  templateUrl: './create-producto.component.html',
  styleUrl: './create-producto.component.css',
})
export class CreateProductoComponent {
  productoService = inject(ProductosService);
  router = inject(Router);

  createProducto(producto: Producto) {
    this.productoService.createProducto(producto).subscribe({
      next: (res: Producto) => {
        console.log("producto creado");
        this.router.navigate(['/productos/list-productos']);
      },
      error: (error) => {
        console.log("error pa");
      }
    });
  }
}
