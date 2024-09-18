import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full',
  },
  {
    path: 'homepage',
    component: HomePageComponent,
    title: 'Homepage',
    data: { icon: 'home' },
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.routes'),
    title: 'Products',
    data: { icon: 'storefront' },
  },
];
