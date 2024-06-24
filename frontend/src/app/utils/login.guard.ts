import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ErrorService } from '../services/error.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserService)
  const router=inject(Router)
  const toastr = inject(ErrorService)
  if(authService.getToken() != null){
    router.navigate(['dashboard'])
    toastr.msjLogin()
    return false
  }else{
    return true;
  }
};
