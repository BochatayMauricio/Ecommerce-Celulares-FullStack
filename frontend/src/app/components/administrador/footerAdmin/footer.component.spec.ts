import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterAdminComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterAdminComponent;
  let fixture: ComponentFixture<FooterAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterAdminComponent]
    });
    fixture = TestBed.createComponent(FooterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
