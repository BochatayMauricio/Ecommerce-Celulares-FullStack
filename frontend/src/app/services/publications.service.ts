import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { publications } from '../interfaces/publications';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {
  private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/publications'
  }

  getPublications(idAdministrator: number) {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/${idAdministrator}`)
  }
}
