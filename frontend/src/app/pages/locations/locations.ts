import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Schedule } from '../../shared/schedule/schedule';

@Component({
  selector: 'app-locations',
  imports: [RouterLink, Schedule],
  templateUrl: './locations.html',
  styleUrl: './locations.css',
})
export class Locations {
  protected readonly locations = [
    {
      city: 'Ciudad de Guatemala',
      name: 'Centro empresarial Zona Pradera',
      address: 'Torre 3, nivel 11, oficina 1104. Blvd. Los Próceres 24-69, zona 10, Guatemala.',
    },
    {
      city: 'Chiquimula',
      name: 'Plaza España',
      address: 'Calzada Héctor Augusto España, a 100 metros de Pradera, Chiquimula.',
    },
    {
      city: 'Puerto Barrios',
      name: 'Plaza Médica San Rafael',
      address: '7a avenida, entre 7a y 8a calle, local 6, Puerto Barrios.',
    },
    {
      city: 'Jalapa',
      name: 'Barrio San Francisco',
      address: '2a calle a 4-06, zona 2, Jalapa, frente al Instituto El Porvenir.',
    },
  ];
}
