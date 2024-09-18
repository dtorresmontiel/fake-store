import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {

  private cartProducts: WritableSignal<CartProduct[]> = signal<CartProduct[]>([]);
  public productCount: Signal<number> = computed<number>(() => this.cartProducts().length);

  private notifyProductAddedToCart = new Subject<CartProduct>();
  public productAddedToCart: Observable<CartProduct> = this.notifyProductAddedToCart.asObservable();

  addProduct(product: CartProduct): void {
    const productIndexInCart: number = this.cartProducts().findIndex(cartProduct => cartProduct.productId === product.productId);
    if (productIndexInCart >= 0) {
      this.cartProducts.update(products => {
        products[productIndexInCart].quantity += product.quantity;
        return products;
      });
    } else {
      this.cartProducts.update(products => [...products, product]);
    }
    this.notifyProductAddedToCart.next(product);
  }

  get products(): CartProduct[] {
    return this.cartProducts();
  }

}

export interface CartProduct {
  productId: number;
  productName: string;
  productPrice: number;
  quantity: number;
}

