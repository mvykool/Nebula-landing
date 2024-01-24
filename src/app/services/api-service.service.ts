import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

const STORE_BASE_URL = 'https://fakestoreapi.com';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	constructor(private http: HttpClient) {}

	getAllProducts(sort = 'desc'): Observable<Array<Product>> {
		return this.http.get<Array<Product>>(`${STORE_BASE_URL}/products?sort=${sort}`);
	}

	addProduct(product: Product): Observable<Product> {
		return this.http.post<Product>(`${STORE_BASE_URL}/products`, product);
	}

	deleteProduct(id: number): Observable<void> {
		return this.http.delete<void>(`${STORE_BASE_URL}/products/${id}`);
	}

	updateProduct(id: number, product: Product): Observable<Product> {
		return this.http.put<Product>(`${STORE_BASE_URL}/products/${id}`, product);
	}
}
