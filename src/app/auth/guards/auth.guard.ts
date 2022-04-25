import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, Route, RouterStateSnapshot, UrlSegment, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.verificaAutenticacion().pipe(tap(estaAuntenticado => {
      if (!estaAuntenticado) {
        this.router.navigate(['./auth/login'])
      }
    }))
    // if (this.authService.nombreUsuario.id) {
    //   return true;
    // }
    // // console.log('canLoad', false);
    // // console.log(route);
    // // console.log(segments);
    // return false;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
    return this.authService.verificaAutenticacion().pipe(tap(estaAutenticado => {
      if (!estaAutenticado) {
        this.router.navigate(['./auth/login'])
      }
    }))
    // if (this.authService.nombreUsuario.id) {
    //   return true;
    // }
    // // console.log('canLoad', false);
    // // console.log(route);
    // // console.log(segments);
    // return false;
  }
}
