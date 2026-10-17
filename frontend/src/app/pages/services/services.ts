import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
  protected readonly media = 'media/img/';

  protected readonly first = '30f4b3_9951b6de185c45108ff5f0bfe4df37db.png';

  protected readonly items = [
    { img: '30f4b3_b54ee1b46a7b45a2bd9ea5a50a874bdc.png', alt: 'Servicio de asesoría migratoria 2' },
    { img: '30f4b3_fc84c442ed974d229b07c1af91eeb9d4.png', alt: 'Servicio de asesoría migratoria 3' },
    { img: '30f4b3_f7ad3e5399444318a661ca66e57c3065.png', alt: 'Servicio de asesoría migratoria 4' },
    { img: '30f4b3_f7e5bb372adb49c3970812df85be2a26.png', alt: 'Servicio de asesoría migratoria 5' },
  ];
}
