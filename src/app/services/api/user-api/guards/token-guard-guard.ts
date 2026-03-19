import { inject } from "@angular/core"
import { UserApiService } from "../user-api-service"
import { Router } from "@angular/router"

export const canActivateAuth = () => {
  const isLogged = inject(UserApiService).isAuth

  // if (isLogged) {
    return true
  // }

  return inject(Router).createUrlTree(['/reg'])
}
