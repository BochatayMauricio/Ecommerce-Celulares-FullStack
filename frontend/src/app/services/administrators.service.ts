import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { user } from 'src/app/interfaces/user';
import { environment } from 'src/app/environments/environments';

interface responseAdminPaginate {
  total:number,
  administrators: user[]
}

@Injectable({
  providedIn: 'root'
})
export class AdministratorsService {
  private myAppUrl: string;
  private myApiUrl: string;
  administrators:user[] = [];

  private administratorsSubject: BehaviorSubject<user[]> = new BehaviorSubject<user[]>([]);
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/Administrators'
  }
  postAdministrator(administratorEnter: user) {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, administratorEnter);
  }

  retraiveAdministrator() {
    this.http.get<user[]>(`${this.myAppUrl}${this.myApiUrl}`).subscribe(administrators => {
      this.administrators = administrators;
      this.administratorsSubject.next(this.administrators);
    });
    return this.administratorsSubject.asObservable();
  }

  getAdministrators(page:number): Observable<responseAdminPaginate>{
    return this.http.get<responseAdminPaginate>(`${this.myAppUrl}${this.myApiUrl}/page/${page}`);
  }

  deleteAdministrator(administrator: user) {
    const dniAdministrator = administrator.dni;
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${dniAdministrator}`);
  }

  updateAdministrator(administratorModify: user) {
    const dniAdministrator = administratorModify.dni;
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${dniAdministrator}`, administratorModify)
  }
}
