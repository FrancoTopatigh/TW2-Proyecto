import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../api/services/auth/auth.service';
import { CarritoService } from '../../api/services/carrito/carrito.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  authService = inject(AuthService);
  carritoService = inject(CarritoService);

  carritoAbierto = false;

  toggleCarrito() {
    this.carritoAbierto = !this.carritoAbierto;
  }

  cerrarCarrito() {
    this.carritoAbierto = false;
  }
}
