import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-panel-administrador',
  templateUrl: './panel-administrador.component.html',
  styleUrls: ['./panel-administrador.component.scss']
})
export class PanelAdministradorComponent implements OnInit {
  admin!: user;
  component = 'admin';
  constructor(private router: Router, private toastr: ToastrService, private userService: UserService) {
  }
  ngOnInit() {
    this.userService.getThisUserBehaviour().subscribe((value) => {
      this.admin = value
      this.isAdmin();
    });
  }

  isAdmin() {
    if (this.admin === undefined) {
      this.router.navigate(['/dashboard']);
      return this.toastr.error('Acceso Denegado');
    } else {
      if (!this.admin.isAdmin) {
        this.router.navigate(['/dashboard']);
        console.log(this.admin)
        return this.toastr.error('Acceso Denegado');
      } else {
        return true
      }
    }
  }


}
