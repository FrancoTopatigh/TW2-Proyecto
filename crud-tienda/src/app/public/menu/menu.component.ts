
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../api/services/carrito/carrito.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  carritoService = inject(CarritoService);

  // Nuestro interruptor manual
  carritoAbierto = false;

  // Función para abrir/cerrar
  toggleCarrito() {
    this.carritoAbierto = !this.carritoAbierto;
  }

  // Función para forzar el cierre al ir a pagar
  cerrarCarrito() {
    this.carritoAbierto = false;
  }
}
