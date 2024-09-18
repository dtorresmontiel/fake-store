import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '@features/products/models/Product.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

import { MatCardFooter, MatCardImage, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartProduct } from '@features/cart/services/CartService';

const MATERIAL_IMPORTS = [MatCardModule, MatCardImage, MatCardFooter, MatButtonModule, MatIconModule];
const defaultThumbSrc = '/assets/new-product.png';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage, ...MATERIAL_IMPORTS],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product!: Product;
  @Input() isFavorite: boolean = false;
  @Input() isLCP: boolean = false;
  setDefaultThumb(): void {
    this.product.images[0] = defaultThumbSrc;
  }

  @Output() onAddProductToCart = new EventEmitter<CartProduct>();
  addProductToCart(event: Event): void {
    this.onAddProductToCart.emit({
      productId: this.product.id,
      productName: this.product.title,
      productPrice: this.product.price,
      quantity: 1,
    });
  }

  @Output() onAddFavoriteProduct = new EventEmitter<number>();
  @Output() onRemoveFavoriteProduct = new EventEmitter<number>();
  toggleFavoriteProduct(event: Event) {
    event.preventDefault(); event.stopPropagation();
    this.isFavorite ?
      this.onRemoveFavoriteProduct.emit(this.product.id) :
      this.onAddFavoriteProduct.emit(this.product.id);
  }

}
