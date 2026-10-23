import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
  protected readonly items = [
    {
      title: 'Asesoría personalizada',
      description: 'Orientación sobre el tipo de visa y los requisitos relacionados con tu consulta.',
    },
    {
      title: 'Revisión de documentos',
      description: 'Revisión y organización de documentos para preparar la solicitud.',
    },
    {
      title: 'Preparación para entrevistas consulares',
      description: 'Práctica y orientación para responder con mayor seguridad y claridad.',
    },
    {
      title: 'Seguimiento del proceso',
      description: 'Acompañamiento e información durante las etapas del proceso acordado.',
    },
  ];
}
