import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { NgForOf, NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { Product } from '../../models/product.model';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-products',
	standalone: true,
	imports: [HttpClientModule, NgIf, NgFor, NgForOf, ProductCardComponent, BreadcrumbComponent],
	templateUrl: './products.component.html',
	styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
	constructor(
		private apiService: ApiService,
		private titleService: Title
	) {
		this.titleService.setTitle('e-Store | Products');
	}
	products!: Product[];

	ngOnInit(): void {
		this.apiService.getAllProducts().subscribe((data: Product[]) => {
			this.products = data;
		});
	}
}
