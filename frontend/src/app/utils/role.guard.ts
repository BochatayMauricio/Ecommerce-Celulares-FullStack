
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable, map, tap } from 'rxjs';
import { inject } from '@angular/core';
import { user } from '../interfaces/user';


export const roleGuard :CanActivateFn=(route,state)=>{
  const authService = inject(UserService)
  const router=inject(Router)
  let user!:user
  authService.getThisUserBehaviour().subscribe({
    next:(res)=> {
        user=res
    }
  })

  if(user.isAdmin){
    return true
  }else{
    router.navigate(['dashboard'])
    return false
  }
}
  
