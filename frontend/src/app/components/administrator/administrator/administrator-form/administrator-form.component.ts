import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdministratorsService } from '../../../../services/administrators.service';
import { ToastrService } from 'ngx-toastr';
import { user } from 'src/app/interfaces/user';

@Component({
  selector: 'app-administrator-form',
  templateUrl: './administrator-form.component.html',
  styleUrls: ['./administrator-form.component.scss']
})
export class AdministratorFormComponent {
  @Output() hideModal = new EventEmitter<boolean>();
  administratorForm = new FormGroup({
    dni: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    surname: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  });
  constructor(private adminService: AdministratorsService, private toastr: ToastrService) { }

  registrarForm(){
    const administrator: user = {
      'dni': this.administratorForm.controls.dni.value!,
      'name': this.administratorForm.controls.name.value!,
      'surname': this.administratorForm.controls.surname.value!,
      'email': this.administratorForm.controls.email.value!,
      'password': this.administratorForm.controls.password.value!,
      'isAdmin': true
    }

    this.adminService.postAdministrator(administrator).subscribe({
      next: () => {
        this.adminService.retraiveAdministrator();
        this.toastr.success('Administrador cargado correctamente');
        this.administratorForm = new FormGroup({
          dni: new FormControl("", Validators.required),
          name: new FormControl("", Validators.required),
          surname: new FormControl("", Validators.required),
          email: new FormControl("", [Validators.required, Validators.email]),
          password: new FormControl("", Validators.required),
        });
      },
      error: () => this.toastr.error('DNI o EMAIL ya existentes')
    });
    this.hideModal.emit(true);
  }
}
