import { Component, OnInit, inject } from '@angular/core';

import { Product } from '@features/products/models/Product.model';
import { ProductCardComponent } from '@features/products/components/product-card/product-card.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';

import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { CartProduct, CartService } from '@features/cart/services/CartService';

import { ProductsService } from '@features/products/services/ProductsService';
import { ProductsServiceApiRest } from '@features/products/infrastructure/ProductsServiceApiRest';
import { SessionService } from '@services/SessionService';
import { User } from '@features/user/models/User.model';
import { SpinnerComponent } from '@components/spinner/spinner.component';


const MATERIAL_IMPORTS = [MatGridListModule, MatPaginatorModule];

const observedBreakPoints: string[] = [Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Web];
const defaultBreakPoint: string = Breakpoints.WebLandscape;
const defaultBreakPointState: BreakpointState = { matches: true, breakpoints: { [defaultBreakPoint]: true } };

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [ProductCardComponent, SpinnerComponent, MATERIAL_IMPORTS],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})

export class ProductsPageComponent implements OnInit {
  constructor(private breakpointObserver: BreakpointObserver) { }
  private productsService: ProductsService = inject(ProductsServiceApiRest);
  loading: boolean = false;
  products!: Product[];
  gridColumns: number = this.calculateGridColumns(defaultBreakPointState);
  tileHeight: number = this.calculateTitleHeight(defaultBreakPointState);

  private sessionService: SessionService = inject(SessionService);
  favorites: number[] = [];

  ngOnInit(): void {
    this.loadProducts();
    this.calculateProductsGridDispositionDependingOnDevice();
    this.sessionService.getUser().subscribe((user: User | undefined) => {
      if (user) this.favorites = user.favoriteProducts;
    });
  }

  private loadProducts(): void {
    this.loading = true;
    this.productsService.getProducts().subscribe((products: Product[]) => {
      this.products = products; this.loading = false;
    });
  }

  private calculateProductsGridDispositionDependingOnDevice() {
    this.breakpointObserver.observe(observedBreakPoints).subscribe(bps => {
      this.gridColumns = this.calculateGridColumns(bps);
      this.tileHeight = this.calculateTitleHeight(bps);
    });
  }

  private readonly cartService: CartService = inject(CartService);

  addProductToCart(cartProduct: CartProduct) {
    this.cartService.addProduct(cartProduct);
  }

  addFavoriteProduct(productId: number): void {
    this.sessionService.addFavoriteProduct(productId);
    console.log('addFavoriteProduct', productId);
  }

  removeFavoriteProduct(productId: number): void {
    this.sessionService.removeFavoriteProduct(productId);
    console.log('removeFavoriteProduct', productId);
  }


  private calculateGridColumns(breakpointState: BreakpointState): number {
    const currentBreakPoint = this.getCurrentBreakPoint(breakpointState);
    switch (currentBreakPoint) {
      case Breakpoints.HandsetLandscape: return 3;
      case Breakpoints.HandsetPortrait: return 1;
      case Breakpoints.TabletLandscape: return 4;
      case Breakpoints.TabletPortrait: return 2;
      case Breakpoints.WebPortrait: return 3;
      case Breakpoints.WebLandscape: return 4;
    }
    return -1;
  }
  private calculateTitleHeight(breakpointState: BreakpointState): number {
    const currentBreakPoint = this.getCurrentBreakPoint(breakpointState);
    switch (currentBreakPoint) {
      case Breakpoints.HandsetLandscape: return 375;
      case Breakpoints.HandsetPortrait: return 450;
      case Breakpoints.TabletLandscape: return 420;
      case Breakpoints.TabletPortrait: return 375;
      case Breakpoints.WebPortrait: return 375;
      case Breakpoints.WebLandscape: return 420;
    }
    return -1;
  }
  private getCurrentBreakPoint({ breakpoints }: BreakpointState): string {
    return Object.keys(breakpoints).filter(breakpoint => breakpoints[breakpoint] ?? false)[0] ?? defaultBreakPoint;
  }
}
