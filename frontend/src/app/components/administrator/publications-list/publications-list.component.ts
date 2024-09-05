import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environments/environments';
import { publications } from 'src/app/interfaces/publications';
import { PublicationsService } from 'src/app/services/publications.service';


@Component({
  selector: 'app-publications-list',
  templateUrl: './publications-list.component.html',
  styleUrls: ['./publications-list.component.css']
})
export class PublicationsListComponent {
  publicationsList: publications[] = [];
  idAdmin:number = 0;
  myAppUrl:string = environment.endpoint
  constructor(private publicationService: PublicationsService, private rutaActiva: ActivatedRoute) {
    this.idAdmin = this.rutaActiva.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.publicationService.getPublications(this.idAdmin).subscribe((value) => {
      this.publicationsList = value
    });
  }

  getUrl(image: string) {
    return `${this.myAppUrl}static/${image}`
  }
}
