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
  administratorResgisted: user[] = [];
  administrator: any;
  user!: user;
  index: number | undefined;

  constructor(private adminService: AdministratorsService, private modalService: BsModalService, private userService: UserService) {
    this.findAdministrator()
  }

  ngOnInit(): void {
    this.adminService.retraiveAdministrator().subscribe(respuesta => this.administratorResgisted = respuesta);

  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  deleteAdministrator(indice: number) {
    const administrator = this.administratorResgisted[indice];


    this.adminService.deleteAdministrator(administrator).subscribe({
      complete: () => this.adminService.retraiveAdministrator(),
      error: (error) => console.log(error)
    });

    this.modalRef?.hide()

  };

  modalRef?: BsModalRef;
  openModal(template: TemplateRef<any>, index: number) {
    this.administrator = this.administratorResgisted[index];
    this.modalRef = this.modalService.show(template);
  }

  findAdministrator() {
    //this.user = this.userService.getThisUserWithSignal();
    this.userService.getThisUserBehaviour().subscribe(value => this.user = value)
  }

}
