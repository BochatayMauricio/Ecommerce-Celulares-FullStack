import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioModificarComponent } from './formulario-modificar.component';

describe('FormularioModificarComponent', () => {
  let component: FormularioModificarComponent;
  let fixture: ComponentFixture<FormularioModificarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioModificarComponent]
    });
    fixture = TestBed.createComponent(FormularioModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
