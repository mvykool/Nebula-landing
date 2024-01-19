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

	getAllProducts(limit = '10', sort = 'desc'): Observable<Array<Product>> {
		return this.http.get<Array<Product>>(`${STORE_BASE_URL}/products?sort=${sort}&limit=${limit}`);
	}
}
