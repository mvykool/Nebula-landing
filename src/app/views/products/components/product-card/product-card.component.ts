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
	selectedProduct!: Product | null;
	visible: boolean = false;
	editMode: boolean = false;
	details: boolean = false;
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

			console.log(data);
		});
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		(error: unknown) => {
			console.error('Error fetching data:', error);
		};
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
		this.details = true;
		this.selectedProduct = product;
	}
	closeDialog(): void {
		this.visible = false;
	}

	onEdit(product: Product): void {
		this.editMode = true;
		this.selectedProduct = product;
		this.visible = true;
	}

	onAdd(): void {
		this.editMode = false;
		this.selectedProduct = null;
		this.visible = true;
	}

	onProductUpdated(product: Product): void {
		// Find the index of the product in the products array
		const index = this.products.findIndex((p) => p.id === product.id);
		// Replace the product at that index with the updated product
		if (index !== -1) {
			this.products[index] = product;
		}

		// Hide the form and trigger change detection
		this.visible = false;
		this.changeDetector.detectChanges();
	}

	onProductAdded(product: Product): void {
		// Add the new product to the start of the products array
		this.products = [product, ...this.products];

		// Hide the form and trigger change detection
		this.visible = false;
		this.changeDetector.detectChanges();
	}
}
