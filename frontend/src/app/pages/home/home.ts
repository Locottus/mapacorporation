import { Component } from '@angular/core';

export interface Review {
  img: string;
  text: string;
  author: string;
}

const MEDIA = 'media/img/';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly media = MEDIA;

  // Opiniones de clientes (imagenes originales en cuadricula de 2 columnas).
  protected readonly reviews: Review[] = [
    {
      img: '30f4b3_11ff50b72d2b48f2921008a8e7e8ed83.png',
      text: 'Súper agradecida con el equipo de MAPA. Me ayudaron con todo y siempre estuvieron pendientes de mi proceso. ¡Ya tengo mi visa!',
      author: 'Andrea López, Mixco | 12 de marzo de 2024',
    },
    {
      img: '30f4b3_240319d0ba3943b2a0d70f450439c348.png',
      text: 'Honestamente, fue la mejor decisión hacer mi trámite con ellos. Todo súper claro, me explicaron paso a paso y me sentí muy seguro.',
      author: 'Carlos Méndez, Escuintla | 7 de noviembre de 2023',
    },
    {
      img: '30f4b3_73ebadfb57f748a6b5dfd5d00b02b07f.png',
      text: 'Yo estaba nerviosísima por la entrevista, pero con las simulaciones que hicimos me sentí súper preparada. ¡Todo salió bien!',
      author: 'María Fernanda Paz, Jalapa | 18 de enero de 2025',
    },
    {
      img: '30f4b3_ca3e183db3584666af7e770bdd496482.png',
      text: 'Lo que más me gustó es que no me dejaron sola en ningún momento. Siempre respondieron rápido y fueron muy atentos.',
      author: 'Luis Alberto Chacón, Santa Lucía Cotzumalguapa | 4 de mayo de 2023',
    },
    {
      img: '30f4b3_64bab57ae3a64817b62a6afb7e9c6ca8.png',
      text: 'No solo te hacen el trámite, te dan confianza. Sentís que hay alguien que sí se preocupa por que todo salga bien.',
      author: 'Estefany Ramírez, Chiquimula | 27 de agosto de 2024',
    },
    {
      img: '30f4b3_9a5cc81e4900459dbd1d25b6ccf8fc15.png',
      text: 'Todo el proceso fue súper ordenado. Me avisaban cada vez que había un paso nuevo y eso me dio mucha tranquilidad.',
      author: 'David Hernández, San Marcos | 9 de diciembre de 2024',
    },
    {
      img: '30f4b3_958be6ff5ef54724b6fb9d4e676620d7.png',
      text: 'La verdad lo intenté sola antes y me rechazaron. Esta vez lo hice con MAPA y ya tengo mi visa. ¡Mil gracias de verdad!',
      author: 'Julia Gómez, Quetzaltenango | 2 de abril de 2025',
    },
    {
      img: '30f4b3_c35e0febab724b9aaf67c787d3f090b1.png',
      text: 'El seguimiento fue lo máximo. Me sentí acompañada todo el tiempo, hasta después de la cita me escribieron para ver cómo me fue.',
      author: 'José Manuel Cifuentes, Villa Nueva | 15 de junio de 2023',
    },
    {
      img: '30f4b3_3f78ed0c8c134ddd9ef739cc444a41a0.png',
      text: 'Se nota que saben lo que hacen. Se tomaron el tiempo de revisar bien mi caso y eso hizo toda la diferencia.',
      author: 'Sandra Castillo, Cobán | 3 de febrero de 2025',
    },
    {
      img: '30f4b3_2300245370a6420497d6c68e8c4df154.png',
      text: 'Mi esposo y yo hicimos el proceso juntos con MAPA y nos fue súper bien. Todo fue claro y rápido. ¡Los recomendamos al 100!',
      author: 'Ricardo y Melany Pérez, Jutiapa | 29 de septiembre de 2024',
    },
  ];

  // Filas de la cuadricula (posicion vertical dentro de la franja, en px).
  protected readonly rowTops = [257, 414, 566, 723, 876];

  protected top(index: number): number {
    return this.rowTops[Math.floor(index / 2)];
  }

  protected left(index: number): number {
    return index % 2 === 0 ? 8 : 502;
  }
}
