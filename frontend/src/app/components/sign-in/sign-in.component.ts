import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  password: string = '';
  email: string = '';
  dni: string = '';
  name: string = '';
  surname: string = '';
  isAdmin: boolean = false;
  loading: boolean = false;

  userForm: FormGroup;
  

  constructor(private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    public fb: FormBuilder) {

      this.userForm = this.fb.group({
        email: ['', [Validators.required,Validators.email]],
        dni: ['', [Validators.required, Validators.maxLength(12)]],
        name: ['', [Validators.required,Validators.maxLength(20)]],
        surname: ['', [Validators.required,Validators.maxLength(20)]],
        isAdmin: [false],
        password: ['', [Validators.required,Validators.maxLength(20)]]
      });

  }

  onSubmit(passwordConfirm:HTMLInputElement){
    console.log(this.userForm)
    if (this.userForm.value.password != passwordConfirm.value) {
      this.toastr.error('Las Password Ingresadas son Distintas', 'Error');
      return;
    }
    this.loading = true;

    this.userService.signIn(this.userForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.toastr.success(`Registrado Exitosamente`, 'Usuario Registrado');
          this.router.navigate(['/login']);
        },
        error: (e:string) => {
          this.toastr.error(e);
          this.loading = false;
        }});
  }

  // addUser() {
  //   //Validar que los campos no sean vacio
  //   if (this.password == '' || this.confirmPassword == '' || this.email == '') {
  //     this.toastr.error('Todos los Campos son Obligatorios', 'Error');
  //     return;
  //   }

  //   //Validar si las password sean iguales
  //   if (this.password != this.confirmPassword) {
  //     this.toastr.error('Las Password Ingresadas son Distintas', 'Error');
  //     return;
  //   }

  //   //Crear el usuario
  //   const user: any = {
  //     dni: this.dni,
  //     email: this.email,
  //     password: this.password,
  //     name: this.name,
  //     surname: this.surname,
  //     isAdmin: this.isAdmin
  //   }

  //   this.loading = true;
  // //   this.userService.signIn(user).subscribe({
  // //     next: (v) => {
  // //       this.loading = false;
  // //       this.toastr.success(`Registrado Exitosamente`, 'Usuario Registrado');
  // //       this.router.navigate(['/login']);
  // //     },
  // //     error: (e: HttpErrorResponse) => {
  // //       this.errorService.msjError(e);
  // //       this.loading = false;
  // //     }
  // //   })

  // }


}
