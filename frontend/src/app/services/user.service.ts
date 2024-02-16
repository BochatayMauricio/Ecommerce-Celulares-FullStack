import { Injectable, OnChanges, OnInit, SimpleChanges, signal } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user } from '../interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class UserService{
  private myAppUrl: string;
  private myApiUrl: string;

  //currentUser = signal<user>({id:0,name:'',dni:'0',surname:'',email:'',password:'',isAdmin:false});
  currentUser$ = new BehaviorSubject<user>({id:0,name:'',dni:'0',surname:'',email:'',password:'',isAdmin:false}); //opcion 2

  constructor(private http: HttpClient,private toastr: ToastrService) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users';
    this.updateUser();
  }

  setThisUser(user: user) {
    //this.currentUser.set(user);
    this.currentUser$.next(user);
  }

  saveToken(token:any){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  removeToken(){
    localStorage.removeItem('token');
  }

  getThisUserBehaviour(){
    return this.currentUser$.asObservable()
  }

  signIn(user: user): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  login(user: user): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/login`, user);
  }

  updateUser(){
    const token = this.getToken();
    if(token){
      const headerToken = new HttpHeaders({'Authorization' : token})
      this.http.post<user>(`${this.myAppUrl}${this.myApiUrl}/user_token`,{headers:headerToken}).subscribe({
        next: current => {
            this.setThisUser(current);
          },
        error: err => this.toastr.error(err)
      });
    }
  }
}
