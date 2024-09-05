import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, of } from 'rxjs';
import { brand } from 'src/app/interfaces/brand';
import { user } from 'src/app/interfaces/user';
import { BrandsService } from 'src/app/services/brands.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-form-brand',
  templateUrl: './form-brand.component.html',
  styleUrls: ['./form-brand.component.css']
})
export class FormBrandComponent {
  brandForm: FormGroup;
  Admin!: user;
  @Output() hideModal = new EventEmitter<boolean>();
  @Output() nowRegister = new EventEmitter<boolean>();
  constructor(
    public fb: FormBuilder, 
    private userService: UserService, 
    private brandService: BrandsService,
    private toastr: ToastrService
  ){
    this.brandForm = this.fb.group({
      name: ['',[Validators.required]],
      maker: ['', [Validators.required]]
    });

    this.userService.getThisUserBehaviour().subscribe((value) => this.Admin = value);
  }

  registrarForm() {
    const brand: brand = {
      idBrand:0,
      name:this.brandForm.get('name')?.value,
      maker: this.brandForm.get('maker')?.value
    }
     this.brandService.postBrand(brand).subscribe({
       next:(res) => {
         this.toastr.success('Marca registrada correctamente');
         this.hideModal.emit(true);
         this.nowRegister.emit(true);
       },
       error:(err) => {
         this.toastr.error(err);
         this.hideModal.emit(true);
       } 
     })
  }
  
}
