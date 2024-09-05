import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { user } from 'src/app/interfaces/user';

import { Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Input() component?: string;

  administrator!: user;
  constructor(
    private modalService: BsModalService,
    private router: Router, private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.getThisUserBehaviour().subscribe(value => this.administrator = value);
  }

  modalRef?: BsModalRef;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  logOut() {
    this.userService.removeToken();
    this.modalRef?.hide()
    this.router.navigate(['/dashboard'])
  }

  openPublications() {
    this.router.navigate([`admin/publications/${this.administrator.id}`])
  }
}




