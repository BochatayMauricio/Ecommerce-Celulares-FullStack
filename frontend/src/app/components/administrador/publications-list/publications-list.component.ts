import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { user } from 'src/app/interfaces/user';
import { PublicationsService } from 'src/app/services/publications.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-publications-list',
  templateUrl: './publications-list.component.html',
  styleUrls: ['./publications-list.component.css']
})
export class PublicationsListComponent {
  publicationsList: any = [];
  idAdmin:number = 0;

  constructor(private publicationService: PublicationsService, private rutaActiva: ActivatedRoute) {
    this.idAdmin = this.rutaActiva.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.publicationService.getPublications(this.idAdmin).subscribe((value) => {
      this.publicationsList = value
    });
  }

  getUrl(image: string) {
    return `http://localhost:3001/static/${image}`
  }
}
