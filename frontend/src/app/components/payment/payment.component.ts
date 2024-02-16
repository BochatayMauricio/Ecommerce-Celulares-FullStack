import { Component, ElementRef, Input, ViewChild , AfterViewInit, NgZone, Output, EventEmitter} from '@angular/core';
import { timeout } from 'rxjs';
import { sales } from 'src/app/interfaces/sales';
import { PaymentService } from 'src/app/services/payment.service';
declare global {
  interface Window {
    Stripe:any
  }
}
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements AfterViewInit{
  @Input() cartSell?:sales[];
  @Output() objectCharge = new EventEmitter<any>();

  private readonly STRIPE!:any;
  private elements:any;
  total=0;

  @ViewChild('cardInfo') cardInfo!: ElementRef ;
  cardError!: string | null;
  card:any;
  constructor(private ngZone:NgZone, private payment:PaymentService){
    this.STRIPE = window.Stripe('pk_test_51OHwGOBu8HuAflvRKJ7xTbIDHe1QvMdLkxud2SCv7nF4dTFy88rENktiqev4FaMYHCmlbPxxQs0vXzrbp0pbM41y00vElQEiA1');
    this.elements = this.STRIPE.elements();
  }

  ngAfterViewInit(): void {
    this.card = this.elements.create('card');
    this.card.mount(this.cardInfo.nativeElement); // porque no es el elemento del dom realmente (el native si)
    this.card.addEventListener('change',this.onChange.bind(this))
    console.log(this.card)
  }

  onChange({error}:any){
    if(error){
      this.ngZone.run(()=>{
        this.cardError = error.message
      })
      
    }else{
      this.ngZone.run(()=>{
         this.cardError = null
      })
    }
  }
  progress_bar = false; //bardera para mostrar barra de progreso mediante la transacción
  async onClick(){
    this.progress_bar = true;
   const {token, error} = await this.STRIPE.createToken(this.card);
    if(token){
       this.payment.chargePayment(this.cartSell!,token.id).subscribe((data)=>{
        this.objectCharge.emit(data);
       });
       
    }else{
      this.ngZone.run(()=>{
        this.cardError = error.message
      })
    }
  }
}
