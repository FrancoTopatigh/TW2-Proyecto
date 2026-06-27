import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPedidoComponent } from './ver-pedido.component';

describe('VerPedidoComponent', () => {
  let component: VerPedidoComponent;
  let fixture: ComponentFixture<VerPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerPedidoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VerPedidoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
