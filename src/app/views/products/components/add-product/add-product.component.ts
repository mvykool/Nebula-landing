import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../../services/api-service.service';
import { Product } from '../../../../models/product.model';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { FileUploadHandlerEvent } from 'primeng/fileupload';

@Component({
	selector: 'app-add-product',
	standalone: true,
	imports: [ReactiveFormsModule, InputTextModule, InputNumberModule, FileUploadModule],
	providers: [MessageService],
	templateUrl: './add-product.component.html',
	styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
	@Input() editProduct!: Product | null;
	@Output() productUpdated: EventEmitter<Product> = new EventEmitter<Product>();
	@Output() productAdded: EventEmitter<Product> = new EventEmitter<Product>();
	uploadedFiles: unknown[] = [];

	newProduct: Product = {
		title: '',
		price: 0,
		id: Date.now(),
		category: '',
		description: '',
		image: ''
	};

	productForm!: FormGroup;

	constructor(
		private apiService: ApiService,
		private messageService: MessageService
	) {}

	ngOnInit(): void {
		this.productForm = new FormGroup({
			title: new FormControl(this.editProduct ? this.editProduct.title : ''),
			description: new FormControl(this.editProduct ? this.editProduct.description : ''),
			price: new FormControl(this.editProduct ? this.editProduct.price : ''),
			image: new FormControl(this.editProduct ? this.editProduct.image : ''),
			category: new FormControl(this.editProduct ? this.editProduct.category : '')
		});
	}

	onUpload(event: FileUploadHandlerEvent): void {
		for (const file of event.files) {
			this.uploadedFiles.push(file);
		}

		this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
	}

	onSubmit(): void {
		if (this.editProduct) {
			this.apiService.updateProduct(this.editProduct.id, this.productForm.value).subscribe({
				next: (updatedProduct: Product) => {
					console.log('Product updated successfully - id:', updatedProduct.id);
					this.productUpdated.emit(updatedProduct);
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
