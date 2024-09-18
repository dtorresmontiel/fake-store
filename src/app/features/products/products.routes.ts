import { Routes } from '@angular/router';

export default <Routes>[
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/products-page/products-page.component').then(m => m.ProductsPageComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/product-page/product-page.component').then(m => m.ProductPageComponent),
  },
];