import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.MarvelComics,
    alt_img: '',
  }
  constructor(
    private heroesService: HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    /** si no ! se encuentra esta ruta url en la ruta editar
     * si estas en la ruta agregar hacer logica de editar heroe
     * muestra error la imagen en la ruta de editar por eso la condicion 
     *  */
    if (!this.router.url.includes('editar')) {
      return
    }
    /**Logica editar heroe
     * obtener id, hacer la transformacion de id con  pipe
     * switchMap hace el cambio y obtenemos id desestructurando
     * retornamos id con el heroesService y lo cachamos con el metodo getHeroePorId
     * nos subcribimos al servicio para obtener informacion del id y lo inyectamos al objeto de heroe de tipo Heroe
     */
    this.activateRoute.params.pipe(switchMap(({ id }) => this.heroesService.getHeroePorId(id))).subscribe(heroe => this.heroe = heroe);
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {  //validar que el superhero tenga texto para guardar
      return
    }
    if (this.heroe.id) {  //si hero tiene id 
      this.heroesService.actualizarHeroe(this.heroe).subscribe(heroe => { this.router.navigate(['/heroes']); this.mostrarSnakbar('Registro Actualizado') }); // se puede actualizar
    } else { //pero si no tiene id
      this.heroesService.agregarHeroe(this.heroe).subscribe(heroe => {  //se agrega un nuevo heroe
        this.router.navigate(['/heroes/editar', heroe.id]);   //navigate : navega a  la ruta de heroes/editar con el id.
        this.mostrarSnakbar('Registro Agregado');
      });
    }
  }

  /**
   * logica borrar heroe
   */
  borrarHeroe() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe  //para enviar la informacion al componete hijo que es confirmar component.ts
    })
    dialog.afterClosed().subscribe((result) => {   //afterClosed despues de cerrar 
      console.log(result);
      if (result === true) {
        this.heroesService.borrarHeroe(this.heroe.id!).subscribe(resp => this.router.navigate(['/heroes']));
      }
    })

  }

  mostrarSnakbar(mensaje: string) {
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    })
  }
}
