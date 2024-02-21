import { Component, AfterViewInit } from '@angular/core';
import {Map, marker, tileLayer} from 'leaflet';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit{

  ngAfterViewInit(){
    const map = new Map('map').setView([-32.954419, -60.643741],13);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    maxZoom: 19,
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    marker([-32.954419, -60.643741]).addTo(map).bindPopup('Sucursal');
  }

  
  
}
