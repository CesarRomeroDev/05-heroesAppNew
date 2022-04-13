export interface Heroe {
    id?: string;              //el id puede venir o no es opcional, se pone un signo de interrogación
    superhero: string;
    publisher: Publisher;
    alter_ego: string;
    first_appearance: string;
    characters: string;
    alt_img?: string;
}

export enum Publisher {
    DCComics = "DC Comics",
    MarvelComics = "Marvel Comics",
}
