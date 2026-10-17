import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Services } from './pages/services/services';
import { Locations } from './pages/locations/locations';
import { Contact } from './pages/contact/contact';
import { Testimonials } from './pages/testimonials/testimonials';
import { DiscoverUsa } from './pages/discover-usa/discover-usa';

export const SITE_NAME = 'MAPA ASESORIAS MIGRATORIAS';

export interface MenuItem {
  label: string;
  path: string;
}

// Mismas URLs que el sitio original en Wix.
export const MENU: MenuItem[] = [
  { label: 'Inicio', path: '/' },
  { label: 'Acerca de', path: '/about-3' },
  { label: 'Servicios', path: '/services-9' },
  { label: 'Ubicaciones', path: '/ubicaciónes' },
  { label: 'Contacto', path: '/contact-4' },
  { label: 'Testimonios', path: '/testimonios' },
  { label: 'Descubre USA', path: '/copia-de-contacto' },
];

export const routes: Routes = [
  { path: '', component: Home, title: `INICIO | ${SITE_NAME}` },
  { path: 'about-3', component: About, title: `Acerca de | ${SITE_NAME}` },
  { path: 'services-9', component: Services, title: `Servicios | ${SITE_NAME}` },
  { path: 'ubicaciónes', component: Locations, title: `Ubicaciones | ${SITE_NAME}` },
  { path: 'contact-4', component: Contact, title: `Contacto | ${SITE_NAME}` },
  { path: 'testimonios', component: Testimonials, title: `Testimonios | ${SITE_NAME}` },
  { path: 'copia-de-contacto', component: DiscoverUsa, title: `Descubre USA | ${SITE_NAME}` },
  { path: '**', redirectTo: '' },
];
