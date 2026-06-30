import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-producto-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.css'] // Si es que usan estilos separados
})
export class ProductoCardComponent {
  // Recibe el producto desde el componente padre
  producto = input.required<Producto>();

  // Emite un evento al padre cuando hacen clic en borrar
  onEliminar = output<number>();

  emitirEliminar() {
    // Le pasamos el ID del producto que queremos borrar
    this.onEliminar.emit(this.producto().id);
  }
}
