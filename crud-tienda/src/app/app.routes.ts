import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';

export const routes: Routes = [

    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'productos',
        loadChildren: ()=> import('./modules/productos/productos.routes').then(e => e.productosRoutes)
    },
    {
        path: '**',
        redirectTo: ''
    }

];
