import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { user } from 'src/app/interfaces/user';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AdministratorsService {
  private myAppUrl: string;
  private myApiUrl: string;
  administrators: any = [];

  private administratorsSubject: BehaviorSubject<user[]> = new BehaviorSubject<user[]>([]);
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/Administrators'
  }
  postAdministrator(administratorEnter: user) {
    //ACA MANDAMOS MEDIANTE UN POST A LA API
    // return this.http.post('http://localhost:3001/api/Administrators', administratorEnter);
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, administratorEnter);
  }

  retraiveAdministrator() {
    // this.http.get('http://localhost:3001/api/Administrators')
    this.http.get(`${this.myAppUrl}${this.myApiUrl}`).subscribe(administrators => {
      this.administrators = administrators;
      this.administratorsSubject.next(this.administrators)
    });
    console.log(this.administratorsSubject);
    return this.administratorsSubject.asObservable();
  }

  deleteAdministrator(administrator: user) {
    const dniAdministrator = administrator.dni;
    //return this.http.delete(`http://localhost:3001/api/Administrators/${dniAdministrator}`);
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${dniAdministrator}`);

  }

  updateAdministrator(administratorModify: user) {
    const dniAdministrator = administratorModify.dni;
    // return this.http.put(`http://localhost:3001/api/Administrators/${dniAdministrator}`, administratorModify)
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${dniAdministrator}`, administratorModify)
  }
}
