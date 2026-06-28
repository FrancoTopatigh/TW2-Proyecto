import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../../api/services/carrito/carrito.service';

@Component({
  selector: 'app-ver-pedido',
  standalone: true,
  imports: [CommonModule], // <-- Acá le sacamos el RouterLink
  templateUrl: './ver-pedido.component.html',
  styleUrls: ['./ver-pedido.component.css']
})
export class VerPedidoComponent {
  constructor(public carritoService: CarritoService) {}
}
