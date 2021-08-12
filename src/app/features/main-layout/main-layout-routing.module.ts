import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../all-products/all-products.module').then(
            (m) => m.AllProductsModule
          ),
      },
      {
        path: 'product/:id',
        loadChildren: () =>
          import('../product-details/product-details.module').then(
            (m) => m.ProductDetailsModule
          ),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainLayoutRoutingModule {}
