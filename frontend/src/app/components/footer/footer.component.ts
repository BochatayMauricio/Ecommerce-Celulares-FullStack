import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Map, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit, OnInit {
  map!: Map;
  ngAfterViewInit() {
    if(!this.map){
      this.map = new Map('map').setView([-32.954419, -60.643741], 13);
      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
      marker([-32.954419, -60.643741]).addTo(this.map).bindPopup('Sucursal');
    }
  }
  

  ngOnInit(){
    this.map = new Map('map').setView([-32.954419, -60.643741], 13);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    marker([-32.954419, -60.643741]).addTo(this.map).bindPopup('Sucursal');
  }

}
