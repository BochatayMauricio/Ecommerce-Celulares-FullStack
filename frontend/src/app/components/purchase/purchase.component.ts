import { Component, inject,OnInit} from '@angular/core';
import { DomicileService } from 'src/app/services/domicile.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { domicile } from 'src/app/interfaces/domicile';


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  
  private fb = inject(FormBuilder);
  formGroup?:FormGroup
  oneAtATime = true;
  collapsed=false;
  component:string="purchase";
  domicile?:domicile;
  idDomicile?:number;
  data:any;

  constructor(private domicileService: DomicileService){
  }

  ngOnInit(): void{
    this.formGroup = this.fb.group({
      codPos: ['', [Validators.required]],
      calle: ['', [Validators.required]],
      numero: ['',[Validators.required]]
    }) 
  }

  setDomicile(){
    // Se setean los datos del formulario a la variable domicilio
    this.domicile = {
      id:0,
      postalCode: this.formGroup!.value.codPos,
      street: this.formGroup!.value.calle,
      number: this.formGroup!.value.numero
    } 
    // Llamamos al servicio para que registre el domicilio en la BD y guarde el id del Domicilio
    this.domicileService.setDomicile(this.domicile).subscribe((data)=> {
      this.data = data;
      this.idDomicile = this.data.id;
      console.log(this.idDomicile) 
    })
  }


  setSucursal() {
    const form:any = document.getElementById('sucursales');
    // Verifica que el elemento con el id 'sucursales' existe
    if (!form) {
        console.error('El formulario no se encuentra.');
        return;
    } else{
      const formData = new FormData(form);
      const selectedSucursal = formData.get('sucursal');
      console.log('Sucursal Seleccioada: ' + selectedSucursal);
      return selectedSucursal
    }
}



}
