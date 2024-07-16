import { Component, TemplateRef } from '@angular/core';
import { AdministratorsService } from '../../../../services/administrators.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-administrators-list',
  templateUrl: './administrators-list.component.html',
  styleUrls: ['./administrators-list.component.scss']
})
export class AdministratorsListComponent {
  adminList: user[] = [];
  administrator: any;
  user!: user;
  index: number | undefined;
  currentPage: number = 1;
  page:number=0;
  totalPages = [];
  disabledNext='';
  disabledBack='';

  constructor(private adminService: AdministratorsService, private modalService: BsModalService, private userService: UserService) {
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
      complete: () => this.adminService.getAdministrators(this.page),
      error: (error) => console.log(error)
    });

    this.modalRef?.hide()

  };

  modalRef?: BsModalRef;
  openModal(template: TemplateRef<any>, index: number) {
    this.administrator = this.adminList[index];
    this.modalRef = this.modalService.show(template);
  }

  findAdministrator() {
    //this.user = this.userService.getThisUserWithSignal();
    this.userService.getThisUserBehaviour().subscribe(value => this.user = value)
  }



  getAdministrators(page:number){
    this.page=page
    let object: any;
    this.adminList = [];
    this.adminService.getAdministrators(this.page).subscribe((data: any) => {
      object = data
    });

    setTimeout(() => {
      const {total, administrators} = object
      this.disabledBack='';
      this.disabledNext='';
      let pagesArray:any = [];
      let i;
      for(i=1; i< total/3; i++){
        pagesArray.push(i);
      }
      if(total%2 != 0){
        pagesArray.push(i)
      }
      this.totalPages = pagesArray
      if(page == this.totalPages.length-1){
        this.disabledNext = 'disabled'
      }
      if(page == 0){
        this.disabledBack = 'disabled'
      }
      for (let i = 0; i < administrators.length; i++) {
          this.adminList.push(administrators[i]) //Agregar el producto con stock >0 al arreglo
        }
      console.log(this.totalPages)
      console.log(this.adminList)
    }, 500);
  }

  getAllAdministrators(){
    this.page=-1;
    this.adminService.retraiveAdministrator().subscribe((data: any) => {
      this.adminList = data
    })
  }





}
