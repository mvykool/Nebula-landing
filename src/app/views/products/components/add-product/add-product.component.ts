import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../../../services/api-service.service';
import { Product } from '../../../../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-add-product',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './add-product.component.html',
	styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
	@Output() productAdded: EventEmitter<Product> = new EventEmitter<Product>();
	newProduct: Product = {
		title: '',
		price: 0,
		id: Date.now(),
		category: '',
		description: '',
		image: '',
		rating: {
			rate: 0,
			count: 0
		}
	};

	constructor(private apiService: ApiService) {}

	onAddProduct(): void {
		console.log('Before API call - id:', this.newProduct.id);
		this.apiService.addProduct(this.newProduct).subscribe({
			next: (addedProduct: Product) => {
				console.log('API Response:', addedProduct);
				console.log('Product added successfully - id:', addedProduct.id);
				this.productAdded.emit(addedProduct);
				// Reset the form
				this.newProduct = {
					title: '',
					price: 0,
					id: Date.now(), // or Date.now() if you prefer
					category: '',
					description: '',
					image: '',
					rating: {
						rate: 0,
						count: 0
					}
				};
			},
			error: (error) => {
				console.error('Error adding product:', error);
			}
		});
		console.log('After API call - id:', this.newProduct.id);
	}
}
