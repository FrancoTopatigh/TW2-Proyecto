import { Component, inject, OnDestroy, OnInit, signal, computed, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../api/services/productos/productos.service';
import { Producto } from '../../modules/productos/interfaces/producto.interface';
import { Subject, takeUntil } from 'rxjs';


import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  private productoService = inject(ProductosService);
  private destroy$ = new Subject<void>();

  // Signal propio del Home para guardar los productos del Backend
  public todosLosProductos = signal<Producto[]>([]);

  // Los computed escuchan al todosLosProductos() de acá arriba
  public pelotas = computed(() => this.todosLosProductos().filter(p => p.clasificacion === 'pelotas'));
  public conjuntos = computed(() => this.todosLosProductos().filter(p => p.clasificacion === 'conjuntos'));
  public botines = computed(() => this.todosLosProductos().filter(p => p.clasificacion === 'botines'));

  ngOnInit(): void {
    this.listarProductosParaHome();
  }

  ngAfterViewInit(): void {
    // Inicializamos los carruseles una vez que la vista está lista
    this.initSwipers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  listarProductosParaHome() {
    this.productoService.listProducto().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (res: Producto[]) => {
        this.todosLosProductos.set(res);
        setTimeout(() => this.initSwipers(), 0);
      },
      error: (error) => {
        console.error("Error al traer productos para el Home:", error);
      }
    });
  }

  initSwipers() {
    const categories = ['.pelotas', '.conjuntos', '.botines'];
    
    categories.forEach(selector => {
      if (document.querySelector(selector)) {
        new Swiper(selector, {
          modules: [Navigation],
          slidesPerView: 1,
          spaceBetween: 20, // 👈 Consistencia de separación para mobile
          navigation: {
            nextEl: `${selector}-next`,
            prevEl: `${selector}-prev`,
          },
          breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 } // 👈 Espaciado fijo óptimo para escritorio
          }
        });
      }
    });
}

  agregarAlPedido(id: number) {
    console.log('Producto agregado a la lista de pedidos pendientes ID:', id);
  }
}