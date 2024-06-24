import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { user } from '../interfaces/user';
import { ErrorService } from '../services/error.service';

export const currentUserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(UserService)
  const toastr = inject(ErrorService)
  let user!:user
  authService.getThisUserBehaviour().subscribe({
    next:(res)=> {
        user=res
    }
  })
  if(route.params["id"] == user.id){
    return true
  }else{
    router.navigate(['dashboard'])
    toastr.msjCurrent()
    return false
  }
  
};
