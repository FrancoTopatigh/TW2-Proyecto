import { Component, input, output, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './producto-form.component.html',
  styleUrls: ['../../pages/create-producto/create-producto.component.css']
})
export class ProductoFormComponent implements OnInit {
  // Inputs: qué modo arranca y qué datos precargar (si es edición)
  modo = input.required<'create' | 'edit'>();
  datosIniciales = input<Producto | null>(null);

  // Output: emite el formulario cocinado al padre para que impacte en la API
  onGuardar = output<any>();

  // Señal local para manejar la imagen base64 de la vista previa
  imagenBase64 = signal<string>('');

  // Estructura del producto que se vincula al ngModel
  productoModel = signal<any>({
    nombre: '',
    clasificacion: '',
    precio: null,
    stock: null,
    descripcion: ''
  });

  ngOnInit(): void {
    // Si estamos editando y nos pasaron datos, los cargamos en el modelo local
    if (this.modo() === 'edit' && this.datosIniciales()) {
      const datos = this.datosIniciales();
      this.productoModel.set({ ...datos });
      if (datos?.imagen) {
        this.imagenBase64.set(datos.imagen);
      }
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenBase64.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  submitForm(formValue: any) {
    // Le pegamos la imagen base64 actual antes de mandarlo al padre
    const datosFinales = {
      ...formValue,
      imagen: this.imagenBase64()
    };
    this.onGuardar.emit(datosFinales);
  }
}
