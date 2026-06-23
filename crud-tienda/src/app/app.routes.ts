import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { VerPedidoComponent } from './modules/pedido/ver-pedido/ver-pedido.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pedido', component: VerPedidoComponent },
  {
    path: 'productos',
    loadChildren: () => import('./modules/productos/productos.routes').then(e => e.productosRoutes)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
