import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {
  heroe!: Heroe;

  constructor(
    private heroesService: HeroesService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.pipe(switchMap(({ id }) => this.heroesService.getHeroePorId(id)))
      .subscribe(heroe => this.heroe = heroe);  //para traer respuesta del id params
  }

}
