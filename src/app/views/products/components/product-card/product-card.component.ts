import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api-service.service';
import { Product } from '../../../../models/product.model';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { DataViewModule } from 'primeng/dataview';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';
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
		ProductDetailsComponent,
		DialogModule,
		AddEditProductComponent
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
		this.apiService.getAllProducts().subscribe({
			next: (data: Product[]) => {
				this.products = data;
			},
			error: (error) => {
				console.error('Error deleting product', error);
			}
		});
	}

	onDelete(productId: number): void {
		this.apiService.deleteProduct(productId).subscribe({
			next: () => {
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
		const index = this.products.findIndex((p) => p.id === product.id);
		if (index !== -1) {
			this.products[index] = product;
		}

		this.visible = false;
		this.changeDetector.detectChanges();
	}

	onProductAdded(product: Product): void {
		this.products = [product, ...this.products];

		this.visible = false;
		this.changeDetector.detectChanges();
	}
}
