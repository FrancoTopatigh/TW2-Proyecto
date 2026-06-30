import { Routes } from "@angular/router";
import { ListProductoComponent } from "./pages/list-producto/list-producto.component";
import { CreateProductoComponent } from "./pages/create-producto/create-producto.component";
import { EditProductoComponent } from "./pages/edit-producto/edit-producto.component";
import { adminGuard } from "../../api/guards/admin-guard";
import { authGuard } from "../../api/guards/auth-guard";

export const productosRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-productos',
        component: ListProductoComponent,
        canActivate: [authGuard]//Rutas protegidas para usuarios registrados
      },
      {
        path: 'create-producto',
        component: CreateProductoComponent,
        canActivate: [adminGuard]//Rutas protegidas para ADMIN
      },
      {
        path: 'edit-producto/:id',
        component: EditProductoComponent,
        canActivate: [adminGuard] //Rutas protegidas para ADMIN
      },
      {
        path: '**',
        redirectTo: 'list-productos'
      }
    ]
  }
];
