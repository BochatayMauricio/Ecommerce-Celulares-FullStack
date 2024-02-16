import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShoppingComponent } from './product-shopping.component';

describe('ProductShoppingComponent', () => {
  let component: ProductShoppingComponent;
  let fixture: ComponentFixture<ProductShoppingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductShoppingComponent]
    });
    fixture = TestBed.createComponent(ProductShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
