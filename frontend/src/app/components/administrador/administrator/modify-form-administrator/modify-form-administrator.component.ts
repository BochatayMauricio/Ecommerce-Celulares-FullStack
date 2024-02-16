import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdministratorsService } from '../../../../services/administrators.service';
import { user } from 'src/app/interfaces/user';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-modify-form-administrator',
  templateUrl: './modify-form-administrator.component.html',
  styleUrls: ['./modify-form-administrator.component.scss']
})
export class ModifyFormAdministratorComponent {
  hide = true;
  @Output() hideModal = new EventEmitter<boolean>();
  @Input() administratorReceived: any;
  constructor(private adminService: AdministratorsService, private toaster: ToastrService) { }

  updateAdministrator(email: any, password: any) {

    const administratorModify: user = {
      id: this.administratorReceived.id,
      dni: this.administratorReceived.dni,
      name: this.administratorReceived.name,
      surname: this.administratorReceived.surname,
      email: email.value || this.administratorReceived.email,
      password: password.value || this.administratorReceived.password,
      isAdmin: this.administratorReceived.isAdmin
    }
    this.adminService.updateAdministrator(administratorModify).subscribe({
      complete: () => {
        this.adminService.retraiveAdministrator();
        this.toaster.success('Administrador actulizado!');
      },
      error: (err) => this.toaster.error('No se realizo correctamente la modificacion')
    });
    this.hideModal.emit(true);
  }
}
