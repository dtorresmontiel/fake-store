import { inject, Injectable } from '@angular/core';
import { CartProduct, CartService } from '@features/cart/services/CartService';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  public messages: Subject<string> = new Subject<string>();
  private cartService: CartService = inject<CartService>(CartService);
  constructor() {

    console.log('Initialize MessagesService');

    this.cartService.productAddedToCart.subscribe((product: CartProduct) => {
      this.messages.next(`Product [${product.productName}] has been added to cart`);
    });

  }
}