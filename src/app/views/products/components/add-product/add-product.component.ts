import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../../services/api-service.service';
import { Product } from '../../../../models/product.model';
//import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-add-product',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './add-product.component.html',
	styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
	@Input() editProduct!: Product | null;
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

	productForm!: FormGroup;

	constructor(private apiService: ApiService) {}

	ngOnInit(): void {
		this.productForm = new FormGroup({
			title: new FormControl(this.editProduct ? this.editProduct.title : ''),
			description: new FormControl(this.editProduct ? this.editProduct.description : ''),
			price: new FormControl(this.editProduct ? this.editProduct.price : ''),
			image: new FormControl(this.editProduct ? this.editProduct.image : ''),
			category: new FormControl(this.editProduct ? this.editProduct.category : '')
		});
	}

	onSubmit(): void {
		if (this.editProduct) {
			this.apiService.updateProduct(this.editProduct.id, this.productForm.value).subscribe({
				next: (updatedProduct: Product) => {
					console.log('Product updated successfully - id:', updatedProduct.id);
				},
				error: (error) => {
					console.error('Error updating product:', error);
				}
			});
		} else {
			this.apiService.addProduct(this.productForm.value).subscribe({
				next: (addedProduct: Product) => {
					console.log('Product added successfully - id:', addedProduct.id);
					this.productAdded.emit(addedProduct);
					this.productForm.reset();
				},
				error: (error) => {
					console.error('Error adding product:', error);
				}
			});
		}
	}
}
