import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { ServicioService } from '../servicio.service';

@Injectable({
  providedIn: 'root',
})
export class PrivateAuthGuard implements CanActivate {
  constructor(
    private readonly auth: ServicioService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.auth.user$.pipe(
      map((user) => {
        console.log(user)
        if (!user) {
          this.router.navigate(['/']);
          return false;
        }

        return true;
      })
    );
  }
}