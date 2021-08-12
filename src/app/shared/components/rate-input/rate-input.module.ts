import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateInputComponent } from './rate-input.component';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [RateInputComponent],
  imports: [CommonModule, MatIconModule],
  exports: [RateInputComponent],
})
export class RateInputModule {}
