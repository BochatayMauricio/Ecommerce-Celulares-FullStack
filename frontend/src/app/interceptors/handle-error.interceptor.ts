import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse)=>{
        let errorMessage = '';
        if(error.error instanceof ErrorEvent){
          errorMessage = `Error: ${error.error.message}`;
        }else{
          if(error.status == 404) {
            return EMPTY
          }
          errorMessage = `Server Error: ${error.status}, message: ${error.error.msg}`;
        }
        return throwError(()=> errorMessage);
      })
    );
  }
}
