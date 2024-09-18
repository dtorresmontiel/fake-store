import { Product } from '@features/products/models/Product.model';
import { Observable } from 'rxjs';

export interface ProductsService {
  getProducts(): Observable<Product[]>;
  getProductById(productId: number): Observable<Product | undefined>;
}