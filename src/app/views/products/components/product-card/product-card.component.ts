import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api-service.service';
import { Product } from '../../../../models/product.model';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { DataViewModule } from 'primeng/dataview';
import { SingleProductComponent } from '../single-product/single-product.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { DialogModule } from 'primeng/dialog';
import { ChangeDetectorRef } from '@angular/core';

@Component({
	selector: 'app-product-card',
	standalone: true,
	imports: [
		ButtonModule,
		CommonModule,
		TagModule,
		DataViewModule,
		SingleProductComponent,
		DialogModule,
		AddProductComponent
	],
	templateUrl: './product-card.component.html',
	styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {
	@Input() products!: Product[];
	selectedProduct: Product | null = null;
	visible: boolean = false;
	edit: boolean = false;
	isLoading: boolean = true;
	layout: 'list' | 'grid' = 'list';

	constructor(
		private apiService: ApiService,
		private changeDetector: ChangeDetectorRef
	) {}

	truncateText(text: string, maxLength: number): string {
		if (text.length > maxLength) {
			return text.substring(0, maxLength) + '...';
		}
		return text;
	}

	ngOnInit(): void {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		this.apiService.getAllProducts().subscribe((data: any) => {
			this.products = data;
			this.isLoading = false;
			console.log(data);
		});
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		(error: unknown) => {
			console.error('Error fetching data:', error);
			this.isLoading = false; // Set loading to false in case of an error
		};
	}

	onEdit(): void {
		this.edit = true;
	}

	onDelete(productId: number): void {
		this.apiService.deleteProduct(productId).subscribe({
			next: () => {
				console.log('Product deleted successfully');
				// Refresh the products list after a successful deletion
				this.products = this.products.filter((product) => product.id !== productId);
			},
			error: (error) => {
				console.error('Error deleting product', error);
			}
		});
	}

	onProductClick(product: Product): void {
		this.visible = true;
		this.selectedProduct = product;
	}
	closeDialog(): void {
		this.visible = false;
	}

	onProductAdded(addedProduct: Product): void {
		if (addedProduct) {
			this.products = [addedProduct, ...this.products];
			this.edit = false;
			console.log(this.products);
			this.changeDetector.detectChanges();
		}
	}
}
