import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { NgForOf, NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { Product } from '../../models/product.model';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';

@Component({
	selector: 'app-products',
	standalone: true,
	imports: [HttpClientModule, NgIf, SingleProductComponent, NgFor, NgForOf, ProductCardComponent, BreadcrumbComponent],
	templateUrl: './products.component.html',
	styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
	constructor(private apiService: ApiService) {}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	products!: Product[];
	selectedProduct: Product | null = null;
	ngOnInit(): void {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		this.apiService.getAllProducts().subscribe((data: any) => {
			this.products = data;
		});
	}

	onProductClick(product: Product): void {
		this.selectedProduct = product;
	}
}
