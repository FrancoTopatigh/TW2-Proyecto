import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../../../api/services/productos/productos.service';
import { Producto } from '../../interfaces/producto.interface';
import { ProductoFormComponent } from '../../components/producto-form/producto-form.component';

@Component({
  selector: 'app-edit-producto',
  standalone: true,
  imports: [ProductoFormComponent,CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-producto.component.html',
  styleUrl: './edit-producto.component.css',
})
export class EditProductoComponent implements OnInit {
  productoService = inject(ProductosService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  productoId!: number;
  public productoActual = signal<any>(null);

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');

    if (idParam) {
      this.productoId = Number(idParam);

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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const maxWith = 800;
          const scale = maxWith / img.width;

          canvas.width = maxWith;
          canvas.height = img.height * scale;

          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const stringComprimido = canvas.toDataURL('image/jpeg', 0.7);

            // Actualizamos el Signal para cambiar la miniatura en tiempo real
            this.productoActual.update(prod => ({ ...prod, imagen: stringComprimido }));
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

 editarProducto(productoFormValue: any) {
  // productoFormValue ya trae los datos modificados y la imagen (nueva o la vieja que mandó el hijo)
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
