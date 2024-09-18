import { Component, inject } from '@angular/core';
import { CartProductComponent } from '../cart-product/cart-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import { MatIconModule } from '@angular/material/icon';
import { CartService } from '@features/cart/services/CartService';

import { MatCardModule, MatCardHeader, MatCardContent, MatCardFooter, MatCardActions, } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

const MATCARD_IMPORTS = [MatCardModule, MatCardHeader, MatCardContent, MatCardFooter];


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartProductComponent, FontAwesomeModule, MatIconModule, MATCARD_IMPORTS, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartService: CartService = inject(CartService);
  faCartShopping = faCartShopping;
}
