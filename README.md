# HeroesApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Tecnologías Aplicadas
    - Angular Material `https://material.angular.io/`
    - Angular Flex-Layout `https://www.npmjs.com/package/@angular/flex-layout`
    - Servidor JSON `https://www.npmjs.com/package/json-server` instalar de manera global en cualquier Sistema Operativo
    - Base de Datos `https://gist.github.com/Klerith/403c91e61d3c87284beb0dd138619958` descargar.
        - Colocar en una carpeta el archivo .json y ejecutar el siguiente comando en la terminal json-server --watch db.json
    - Descargar Imagenes
    - Tipado para nuestra Data https://app.quicktype.io/


## Repaso:
Para realizar un modulo de rutas, es importante poner el --flat al ultimo para no generar una carpeta por ejemplo:
 ng g m appRouting --flat.

## Crear un pipe en consola:
ng g pipe heroes/pipes/imagen --skip-Tests  ('imagen' es el nombre del pipe)