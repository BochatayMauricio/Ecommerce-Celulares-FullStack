
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { user } from 'src/app/interfaces/user';
import { CustomerService } from 'src/app/services/customer.service';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent{
  showData: boolean = true;
  button: string = 'Mostrar';
  data: boolean = false;
  mail: boolean = false;
  user!: user;
  newEmail: string = "";
  newPassword: string = "";
  newPassword2: string = "";
  modalRef?: BsModalRef;
  constructor(private customerService: CustomerService,
    private userService: UserService,
    private toastr: ToastrService,) {

    this.userService.getThisUserBehaviour().subscribe(value => this.user = value);
  }

  userModifier() {
    if ((this.newPassword != '' && this.newPassword2 != '') || (this.newEmail != '')) {
      if (this.newEmail != "") {
        this.user.email = this.newEmail;
        this.customerService.updateCustomers(this.user.dni, this.user).subscribe({
          next: () => {
            this.user.email = this.user.email;
            localStorage.setItem('user', JSON.stringify(this.user));
            this.toastr.success(`Mail Modificado a: ${this.user.email}`);
            this.newPassword = '';
            this.newPassword2 = '';
            this.newEmail = '';

          }, error: (e: string) => {
            this.toastr.error(`ERROR  ${this.user.email}`);
            this.toastr.error(e);
          }
        });

      } if ((this.newPassword != '' && this.newPassword2 != '')) {
        if (this.newPassword === this.newPassword2) {
          this.user.password = this.newPassword;

          this.customerService.updateCustomers(this.user.dni, this.user).subscribe({
            next: () => {
              this.toastr.success(`Contraseña modificada`);

              this.newPassword = '';
              this.newPassword2 = '';
              this.newEmail = '';

            }, error: () => {
              this.toastr.error("Ocurrio un Error");
            }
          });
        } else {
          this.toastr.error(`Las contraseñas deben Coincidir`)
        };
      }

    } else {
      this.toastr.error('Los campos son obligatorios')

    }


  }

  showPasswords(pass1: HTMLInputElement, pass2: HTMLInputElement) {
    if (pass1.type == 'text') {
      pass1.type = 'password';
      pass2.type = 'password';
      this.button = 'Ocultar'
    } else {
      pass1.type = 'text';
      pass2.type = 'text';
      this.button = 'Mostrar'
    }


  }

}
