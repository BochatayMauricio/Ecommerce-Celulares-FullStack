import { Component, TemplateRef } from '@angular/core';
import { AdministratorsService } from '../../../../services/administrators.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

interface responseAdminPaginate {
  total:number,
  administrators: user[]
}

@Component({
  selector: 'app-administrators-list',
  templateUrl: './administrators-list.component.html',
  styleUrls: ['./administrators-list.component.scss']
})
export class AdministratorsListComponent {
  adminList: user[] = [];
  administrator!: user;
  user!: user;
  index?: number;
  currentPage: number = 1;
  page:number=0;
  totalPages:number[] = [];

  constructor(
    private adminService: AdministratorsService, 
    private modalService: BsModalService, 
    private userService: UserService,
    private toastr: ToastrService) {
    this.findAdministrator()
  }

  ngOnInit(): void {
   this.getAdministrators(this.page)
  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  deleteAdministrator(indice: number) {
    const administrator = this.adminList[indice];
    this.adminService.deleteAdministrator(administrator).subscribe({
      next: () => this.adminService.getAdministrators(this.page),
      error: (error) => this.toastr.error(error)
    });
    this.modalRef?.hide()
  };

  modalRef?: BsModalRef;
  openModal(template: TemplateRef<any>, index: number) {
    this.administrator = this.adminList[index];
    this.modalRef = this.modalService.show(template);
  }

  findAdministrator() {
    this.userService.getThisUserBehaviour().subscribe(value => this.user = value)
  }



  getAdministrators(page:number){
    this.page=page
    let object: responseAdminPaginate;
    this.adminList = [];
    this.adminService.getAdministrators(this.page)
    .subscribe((data: responseAdminPaginate) => {
      object = data
    });

    setTimeout(() => {
      const {total, administrators} = object
      let pagesArray:number[] = [];
      let i;
      for(i=1; i< total/3; i++){
        pagesArray.push(i);
      }
      if(total%2 != 0){
        pagesArray.push(i)
      }
      this.totalPages = pagesArray
      for (let i = 0; i < administrators.length; i++) {
          this.adminList.push(administrators[i]) //Agregar el producto con stock >0 al arreglo
        }
    }, 500);
  }

  getAllAdministrators(){
    this.page=-1;
    this.adminService.retraiveAdministrator().subscribe({
      next:(data: user[]) => {
        this.adminList = data
      },
      error:(error)=> this.toastr.error(error)
    })
  }

}
