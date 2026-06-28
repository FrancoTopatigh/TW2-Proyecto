import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // <-- 1. Agregamos esta importación para los botones del HTML
import { CarritoService } from '../../../api/services/carrito/carrito.service';

@Component({
  selector: 'app-ver-pedido',
  standalone: true,
  imports: [CommonModule, RouterLink], // <-- 2. Enchufamos el RouterLink acá adentro
  templateUrl: './ver-pedido.component.html',
  styleUrls: ['./ver-pedido.component.css']
})
export class VerPedidoComponent {

  // Al ser "public", el HTML tiene permiso total de usar las funciones del servicio directamente
  constructor(public carritoService: CarritoService) {}

  // Conservamos tu botón de prueba por si querés usarlo para mostrarle al profe
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
