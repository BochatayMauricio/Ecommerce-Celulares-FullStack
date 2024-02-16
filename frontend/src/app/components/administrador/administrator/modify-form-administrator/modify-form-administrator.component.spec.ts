import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyFormAdministratorComponent } from './modify-form-administrator.component';

describe('ModifyFormAdministratorComponent', () => {
  let component: ModifyFormAdministratorComponent;
  let fixture: ComponentFixture<ModifyFormAdministratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyFormAdministratorComponent]
    });
    fixture = TestBed.createComponent(ModifyFormAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
