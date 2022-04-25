import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',       //Cundo alguien entre al path auth
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)  //Carga a sus hijos .then'entonces' carga el AuthModule
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    canLoad: [AuthGuard], //peoteccion de rutas
    canActivate: [AuthGuard] //peoteccion de rutas
  },
  {
    path: '404',
    component: ErrorPageComponent   //Ruta padre el inicio
  },
  {
    path: '**',
    redirectTo: '404'   //Si escribe otra ruta las direcciona al componente ErrorPage(**) ruta a direccionar
  }
]


@NgModule({
  /**
   * importamos en este archivo los servicios de RouterModule de Angular
   *  para que se apliquen en nuestra matriz routes.
   */
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule    //disposicion en toda la aplicacion
  ]
})
export class AppRoutingModule { }
