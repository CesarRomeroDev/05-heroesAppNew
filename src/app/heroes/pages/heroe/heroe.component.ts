import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})
export class HeroeComponent implements OnInit {
  heroe!: Heroe;

  constructor(
    private heroesService: HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  /**
   * ActivatedRoute:
   * Brinda acceso a información sobre una ruta asociada a un componente
   *  que se carga en un tomacorriente. Úselo para recorrer el RouterStateárbol
   *  y extraer información de los nodos.
   */
  ngOnInit(): void {
    this.activateRoute.params.pipe(switchMap(({ id }) => this.heroesService.getHeroePorId(id)))
      .subscribe(heroe => this.heroe = heroe);  //para traer respuesta del id params
  }
  regresar() {
    this.router.navigate(['/heroes/listado']);
  }

}
