import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api-service.service';
import { Product } from '../../../../models/product.model';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { DataViewModule } from 'primeng/dataview';

@Component({
	selector: 'app-product-card',
	standalone: true,
	imports: [ButtonModule, CommonModule, TagModule, DataViewModule],
	templateUrl: './product-card.component.html',
	styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {
	@Input() products!: Product[];
	isLoading: boolean = true;
	layout: 'list' | 'grid' = 'list';

	constructor(private apiService: ApiService) {}

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
}
