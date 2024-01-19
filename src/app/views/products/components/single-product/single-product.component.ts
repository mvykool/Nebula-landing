import { Component, Input } from '@angular/core';
import { Product } from '../../../../models/product.model';

@Component({
	selector: 'app-single-product',
	standalone: true,
	imports: [],
	templateUrl: './single-product.component.html',
	styleUrl: './single-product.component.scss'
})
export class SingleProductComponent {
	@Input() product: Product | null = null;
}
