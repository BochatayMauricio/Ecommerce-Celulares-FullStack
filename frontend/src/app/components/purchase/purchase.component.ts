import { Component } from '@angular/core';
import { domicile } from 'src/app/interfaces/domicile';


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent {
  private domicile?: domicile;
  oneAtATime = true;
  collapsed=false;
}
