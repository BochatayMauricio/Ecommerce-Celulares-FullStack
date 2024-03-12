import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { user } from '../interfaces/user';


export const roleGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  let currentUser:user
  userService.getThisUserBehaviour().subscribe(value => {
    currentUser = value
    return
  });
  if(currentUser!){
    if(currentUser.isAdmin) return true
    else 
      router.navigate(['/dashboard'])
      return false
  }else return false
};
