import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user } from '../interfaces/user';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

type loginUser = {
  email:string,
  password:string,
  isAdmin:boolean
}
interface responseLogin{
  tok:string,
  us:user
}

@Injectable({
  providedIn: 'root'
})
export class UserService{
  private myAppUrl: string;
  private myApiUrl: string;

  currentUser$ = new BehaviorSubject<user>({id:0,name:'invitado',dni:'0',surname:'invitado',email:'invitado',password:'*****',isAdmin:false}); //opcion 2

  constructor(private http: HttpClient,private toastr: ToastrService) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users';
    this.updateUser();
  }

  setThisUser(user: user) {
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
    this.updateUser();
    return this.currentUser$.asObservable()
  }

  signIn(user: user): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  login(user: loginUser): Observable<responseLogin> {
    return this.http.post<responseLogin>(`${this.myAppUrl}${this.myApiUrl}/login`, user);
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
