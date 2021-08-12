import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rate-input',
  templateUrl: './rate-input.component.html',
  styleUrls: ['./rate-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RateInputComponent,
      multi: true,
    },
  ],
})
export class RateInputComponent implements ControlValueAccessor {
  stars = [1, 2, 3, 4, 5];
  value = 0;
  disabled = false;

  onChange!: (stars: number) => void;
  onTouch!: () => void;

  writeValue(stars: number): void {
    this.value = stars;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  setValue(star: number): void {
    if (this.disabled) return;
    this.value = star;
    this.onChange(this.value);
    this.onTouch();
  }
}
