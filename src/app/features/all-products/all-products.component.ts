import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@interfaces/Product';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent {
  products$: Observable<Product[]>;

  constructor(private apiService: ApiService, private router: Router) {
    this.products$ = this.apiService.getProducts();
  }

  openProductDetails(product: Product): void {
    this.router.navigate(['product', product.id], { state: { product } });
  }
}
