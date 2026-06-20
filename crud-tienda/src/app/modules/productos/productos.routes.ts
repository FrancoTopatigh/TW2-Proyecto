import { Routes } from "@angular/router";
import { ListProductoComponent } from "./pages/list-producto/list-producto.component";
import { CreateProductoComponent } from "./pages/create-producto/create-producto.component";
import { EditProductoComponent } from "./pages/edit-producto/edit-producto.component";

export const productosRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-productos',
        component: ListProductoComponent
      },
      {
        path: 'create-producto',
        component: CreateProductoComponent
      },
      {
        path: 'editar-producto',
        component: EditProductoComponent
      },
      {
        path: '**',
        redirectTo: 'list-productos'
      }
    ]
  }
];
