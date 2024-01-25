import { Component, Input } from '@angular/core';
import { Product } from '../../../../models/product.model';

@Component({
	selector: 'app-product-details',
	standalone: true,
	imports: [],
	templateUrl: './product-details.component.html',
	styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
	@Input() product: Product | null = null;
}
