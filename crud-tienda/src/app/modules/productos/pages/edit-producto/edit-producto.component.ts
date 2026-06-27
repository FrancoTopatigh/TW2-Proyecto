import { Component, inject, OnInit, signal } from '@angular/core'; // 👈 Agregamos OnInit
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; // 👈 Agregamos ActivatedRoute
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../../../api/services/productos/productos.service';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-edit-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-producto.component.html',
  styleUrl: './edit-producto.component.css',
})
export class EditProductoComponent implements OnInit {
  productoService = inject(ProductosService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute); // 👈 Inyectamos para leer el ID de la URL

  // Creamos un objeto vacío o una variable para guardar el producto que traemos del back
  productoId!: number;
  public productoActual = signal<any>({});

  ngOnInit(): void {
    // 1. Capturamos el 'id' que viene en la ruta (asegurate que en tu archivo de rutas figure como :id)
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');

    if (idParam) {
      this.productoId = Number(idParam);

      // 2. Buscamos el producto en la base de datos para rellenar los inputs del HTML
      this.productoService.traerProductoPorId(this.productoId).subscribe({
        next: (res: Producto) => {
          this.productoActual.set(res);
          console.log("Datos del producto cargados para editar, pa:", res);
        },
        error: (error) => {
          console.error("Error al traer el producto por ID:", error);
        }
      });
    }
  }

  editarProducto(productoFormValue: any) {
    // 3. Juntamos el ID original con los nuevos datos que el usuario modificó en el formulario
    const productoEditado: Producto = {
      ...productoFormValue,
      id: this.productoId
    };

    this.productoService.editarProducto(productoEditado).subscribe({
      next: (res: any) => {
        console.log("Se editó el producto pa");
        this.router.navigate(['/productos/list-productos']);
      },
      error: (error) => {
        console.log("Error al editar pa", error);
      }
    });
  }
}
