
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { user } from 'src/app/interfaces/user';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-purchases.component.html',
  styleUrls: ['./user-purchases.component.css']
})
export class UserPurchasesComponent implements OnInit {
  idUser=0;
  listOfSales: any;
  modalRef?: BsModalRef;
  panelOpenState = false;
  constructor(private customerService: CustomerService,
    private modalService: BsModalService, private rutaActiva: ActivatedRoute) {
      
      this.idUser = this.rutaActiva.snapshot.params['idUser'];
      console.log(this.idUser)
  }

  ngOnInit(): void {
   this.customerService.getSalesUser(this.idUser).subscribe((data) => {
     this.listOfSales = data
   })
  }

  productInfo(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getUrl(image:string|undefined){
    return `http://localhost:3001/static/${image}`
  }

}
