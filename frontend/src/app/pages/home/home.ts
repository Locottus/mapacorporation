import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly reviews = [
    {
      text: 'Súper agradecida con el equipo de MAPA. Me ayudaron con todo y siempre estuvieron pendientes de mi proceso. ¡Ya tengo mi visa!',
      author: 'Andrea López, Mixco',
      date: '12 de marzo de 2024',
    },
    {
      text: 'Honestamente, fue la mejor decisión hacer mi trámite con ellos. Todo súper claro, me explicaron paso a paso y me sentí muy seguro.',
      author: 'Carlos Méndez, Escuintla',
      date: '7 de noviembre de 2023',
    },
    {
      text: 'Yo estaba nerviosísima por la entrevista, pero con las simulaciones que hicimos me sentí súper preparada. ¡Todo salió bien!',
      author: 'María Fernanda Paz, Jalapa',
      date: '18 de enero de 2025',
    },
    {
      text: 'Lo que más me gustó es que no me dejaron sola en ningún momento. Siempre respondieron rápido y fueron muy atentos.',
      author: 'Luis Alberto Chacón, Santa Lucía Cotzumalguapa',
      date: '4 de mayo de 2023',
    },
    {
      text: 'No solo te hacen el trámite, te dan confianza. Sentís que hay alguien que sí se preocupa por que todo salga bien.',
      author: 'Estefany Ramírez, Chiquimula',
      date: '27 de agosto de 2024',
    },
    {
      text: 'Todo el proceso fue súper ordenado. Me avisaban cada vez que había un paso nuevo y eso me dio mucha tranquilidad.',
      author: 'David Hernández, San Marcos',
      date: '9 de diciembre de 2024',
    },
    {
      text: 'La verdad lo intenté sola antes y me rechazaron. Esta vez lo hice con MAPA y ya tengo mi visa. ¡Mil gracias de verdad!',
      author: 'Julia Gómez, Quetzaltenango',
      date: '2 de abril de 2025',
    },
    {
      text: 'El seguimiento fue lo máximo. Me sentí acompañada todo el tiempo, hasta después de la cita me escribieron para ver cómo me fue.',
      author: 'José Manuel Cifuentes, Villa Nueva',
      date: '15 de junio de 2023',
    },
    {
      text: 'Se nota que saben lo que hacen. Se tomaron el tiempo de revisar bien mi caso y eso hizo toda la diferencia.',
      author: 'Sandra Castillo, Cobán',
      date: '3 de febrero de 2025',
    },
    {
      text: 'Mi esposo y yo hicimos el proceso juntos con MAPA y nos fue súper bien. Todo fue claro y rápido. ¡Los recomendamos al 100!',
      author: 'Ricardo y Melany Pérez, Jutiapa',
      date: '29 de septiembre de 2024',
    },
  ];}
