import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';

import { Product } from '@features/products/models/Product.model';
import { ProductsService } from '@features/products/services/ProductsService';

@Injectable({ providedIn: 'root' })
export class ProductsServiceApiRest implements ProductsService {

  constructor(private http: HttpClient) { }

  baseEndPoint = 'https://backend.fake-store.com/products';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseEndPoint);
  }

  getProductById(productId: number): Observable<Product | undefined> {
    return this.http.get<Product | undefined>(this.baseEndPoint + '/' + productId);
  }

  createNewProduct(product: Product): void {

  }
}