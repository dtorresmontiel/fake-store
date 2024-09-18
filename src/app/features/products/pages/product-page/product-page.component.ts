import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '@features/products/models/Product.model';
import { ProductsService } from '@features/products/services/ProductsService';
import { ProductsServiceApiRest } from '@features/products/infrastructure/ProductsServiceApiRest';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }
  private productsService: ProductsService = inject(ProductsServiceApiRest);
  product!: Product;
  ngOnInit(): void {
    this.productsService.getProductById(+this.route.snapshot.params['id']).subscribe((product: Product | undefined) => { if (product) { this.product = product; } });
  }
}
