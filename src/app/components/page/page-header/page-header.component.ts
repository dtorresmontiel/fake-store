import { Component, EventEmitter, inject, Input, OnInit, Output, Signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NavigationStart, Router, RouterLink } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '@features/cart/services/CartService';
import { filter } from 'rxjs';

const MATERIAL_IMPORTS = [MatToolbarModule, MatButtonModule, MatIconModule, MatBadgeModule];

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, ...MATERIAL_IMPORTS],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})
export class PageHeaderComponent implements OnInit {

  private cartService: CartService = inject(CartService);
  cartCount: Signal<number> = this.cartService.productCount;
  isCartOpened: boolean = false;
  isCartClosedByUser: boolean = false;
  toggleCartOpened(event: Event): void {
    event.preventDefault();
    if (!this.isCartOpened && this.cartCount() == 0) return;
    this.isCartOpened = !this.isCartOpened;
    this.onCartDetailOpenedChange.emit(this.isCartOpened);
    if (!this.isCartOpened) {
      this.isCartClosedByUser = true;
    }
  }
  @Output() onCartDetailOpenedChange = new EventEmitter<boolean>();


  @Output() onBurguerMenuClick = new EventEmitter<void>();
  @Output() onNewProductClick = new EventEmitter<void>();

  private router: Router = inject(Router);
  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(() => {
      this.isCartOpened = false;
      this.onCartDetailOpenedChange.emit(this.isCartOpened);
    });
    this.cartService.productAddedToCart.subscribe(() => {
      if (!this.isCartClosedByUser) {
        //this.isCartOpened = true;
        //this.onCartDetailOpenedChange.emit(this.isCartOpened);
      }
    });
  }
}
