import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // <-- Asegurate de sumar esta importación arriba
import { CarritoService } from '../../../api/services/carrito/carrito.service';

@Component({
  selector: 'app-ver-pedido',
  standalone: true,
  imports: [CommonModule, RouterLink], // <-- Enchufale el RouterLink acá
  templateUrl: './ver-pedido.component.html',
  styleUrls: ['./ver-pedido.component.css']
})
export class VerPedidoComponent {
  constructor(public carritoService: CarritoService) {}
}
