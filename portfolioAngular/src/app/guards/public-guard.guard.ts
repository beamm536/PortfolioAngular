import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ServicioService } from '../servicio.service';

@Injectable({
  providedIn: 'root',
})
export class PublicAuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly auth: ServicioService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.auth.user$.pipe(
      map((user) => {
        if (user) {
          this.router.navigate(['/listar-proyecto']);
          return false;
        }

        return true;
      })
    );
  }
}