import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllProductsRoutingModule } from './all-products-routing.module';
import { AllProductsComponent } from './all-products.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AllProductsComponent],
  imports: [
    CommonModule,
    AllProductsRoutingModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class AllProductsModule {}
