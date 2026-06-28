import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../../api/services/carrito/carrito.service';

@Component({
  selector: 'app-ver-pedido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-pedido.component.html',
  styleUrls: ['./ver-pedido.component.css']
})
export class VerPedidoComponent {

  constructor(public carritoService: CarritoService) {}

  probarMotor() {
    this.carritoService.agregarProducto({
      productoId: 99,
      nombre: 'Producto de Prueba',
      precio: 1500,
      cantidad: 1
    });
    console.log("¡Producto agregado! Total actual: $", this.carritoService.obtenerTotal());
  }
}
