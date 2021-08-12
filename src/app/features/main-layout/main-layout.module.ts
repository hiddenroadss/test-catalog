import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './main-layout.component';
import { HeaderModule } from '@core/components/header/header.module';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [CommonModule, MainLayoutRoutingModule, HeaderModule],
})
export class MainLayoutModule {}
