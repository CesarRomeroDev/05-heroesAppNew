import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Auth } from '../pages/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl
  private _nombreUsuario: Auth | undefined  //como lo tenemos en un metodo privado , vamos a hacer un getter

  /**
   * lo desestructuramos : (...)
   * Utilizando este patrón, puedes desempacar y asignar la parte restante de un arreglo a una variable.
   */
  get nombreUsuario() {
    return { ...this._nombreUsuario }
  }

  constructor(
    private http: HttpClient
  ) { }

  verificaAutenticacion(): Observable<boolean> {
    if (!localStorage.getItem('token')) {     //si no tinene ningun token almacenado entonces , sal de ahi 
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(map(nombreUsuario => {
        this._nombreUsuario = nombreUsuario;
        return true;
      }))
  }

  /**
   * cuando se haga esta peticion y antes de pasar al subcribe de login.component
   * va a pasar por este tap, el tap va a recibir esta respuesta que viene del back end
   * lo cual al observar en consola se dispara primero el mensaje del console.log y despues el subscribe de login.component
   * 
   * El tap se usa para generar efectos secundarios
   */
  login() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap(nombreUsuario => this._nombreUsuario = nombreUsuario),
        tap(nombreUsuario => localStorage.setItem('token', nombreUsuario.id))); //lo agregamos al localStotage para registrar en memoria el id
  }
}
