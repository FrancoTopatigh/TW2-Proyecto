import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../../../api/services/productos/productos.service';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-create-producto',
  imports: [FormsModule, RouterLink],
  templateUrl: './create-producto.component.html',
  styleUrl: './create-producto.component.css',
})
export class CreateProductoComponent {
  productoService = inject(ProductosService);
  router = inject(Router);

  imagenBase64 = signal<string>('');

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
            this.imagenBase64.set(canvas.toDataURL('image/jpeg', 0.7));
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  createProducto(productoFormValue: any) {
    const productoANviar: Producto = {
      ...productoFormValue,
      imagen: this.imagenBase64()
    };

    this.productoService.createProducto(productoANviar).subscribe({
      next: (res: Producto) => {
        this.router.navigate(['/productos/list-productos']);
      },
      error: (error) => {
        console.log("error pa", error);
        console.error("Mensaje del servidor:", error.error);
      }
    });
  }
}