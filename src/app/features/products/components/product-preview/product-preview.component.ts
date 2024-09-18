import { Component, Input } from '@angular/core';
import { Product } from '@features/products/models/Product.model';

@Component({
  selector: 'app-product-preview',
  standalone: true,
  imports: [],
  templateUrl: './product-preview.component.html',
  styleUrl: './product-preview.component.css'
})
export class ProductPreviewComponent {
  @Input() product!: Product;

}
