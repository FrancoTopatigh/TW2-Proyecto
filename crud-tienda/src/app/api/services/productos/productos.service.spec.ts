import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http'; // 👈 IMPORTANTE: Agregá esto también
import { provideHttpClientTesting } from '@angular/common/http/testing'; // 👈 Y esto

// 🚀 CAMBIO CLAVE: Cambiar 'Productos' por 'ProductosService'
import { ProductosService } from './productos.service';

describe('ProductosService', () => {
  let service: ProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // 💡 REGLA DE ORO: Como tu servicio usa HttpClient, hay que darle los mocks para que el test no explote
      providers: [
        ProductosService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
