import { Component, Input } from '@angular/core';
import { CartProduct } from '@features/cart/services/CartService';

@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.css'
})
export class CartProductComponent {
  @Input() cartProduct!: CartProduct;
}
