import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../../services/api-service.service';
import { Product } from '../../../../models/product.model';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-add-edit-product',
	standalone: true,
	imports: [ReactiveFormsModule, InputTextModule, InputNumberModule, CommonModule],
	providers: [MessageService],
	templateUrl: './add-edit-product.component.html',
	styleUrl: './add-edit-product.component.scss'
})
export class AddEditProductComponent implements OnInit {
	@Input() editProduct!: Product | null;
	@Output() productUpdated: EventEmitter<Product> = new EventEmitter<Product>();
	@Output() productAdded: EventEmitter<Product> = new EventEmitter<Product>();
	previewImage?: string;

	newProduct: Product = {
		title: '',
		price: 0,
		id: 0,
		category: '',
		description: '',
		image: ''
	};

	productForm!: FormGroup;

	constructor(private apiService: ApiService) {}

	ngOnInit(): void {
		this.productForm = new FormGroup({
			title: new FormControl(this.editProduct ? this.editProduct.title : '', Validators.required),
			description: new FormControl(this.editProduct ? this.editProduct.description : '', Validators.required),
			price: new FormControl(this.editProduct ? this.editProduct.price : '', Validators.required),
			image: new FormControl(this.editProduct ? this.editProduct.image : '', Validators.required),
			category: new FormControl(this.editProduct ? this.editProduct.category : '', Validators.required)
		});

		this.productForm.get('image')?.valueChanges.subscribe((value) => {
			this.previewImage = value;
		});
	}

	onSubmit(): void {
		if (this.editProduct) {
			this.apiService.updateProduct(this.editProduct.id, this.productForm.value).subscribe({
				next: (updatedProduct: Product) => {
					this.productUpdated.emit(updatedProduct);
				},
				error: (error) => {
					console.error('Error updating product:', error);
				}
			});
		} else {
			this.apiService.addProduct(this.productForm.value).subscribe({
				next: (addedProduct: Product) => {
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
