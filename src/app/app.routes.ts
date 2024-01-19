import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./views/home/home.component').then((m) => m.HomeComponent)
	},
	{
		path: 'products',
		loadComponent: () => import('./views/products/products.component').then((m) => m.ProductsComponent)
	},
	{
		path: '**',
		loadComponent: () => import('./views/not-found/not-found.component').then((m) => m.NotFoundComponent)
	}
];
