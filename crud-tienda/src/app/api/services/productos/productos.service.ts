import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Producto } from '../../../modules/productos/interfaces/producto.interface';
import { environment } from '../../../../environments/environment.development';
import { ProductoMapper } from './mapping/producto.mapper';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  http = inject(HttpClient);

  listProducto(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${environment.API_URL}/productos`).pipe(
      map((res) => {
        return ProductoMapper.mapRestProductoArrayToProductoArrayFront(res);
      })
    );
  }

  createProducto(producto: Producto): Observable<any> {
    const body = ProductoMapper.mapProductoFrontToProductoRest(producto);
    return this.http.post<any>(`${environment.API_URL}/productos`, body);
  }
}
