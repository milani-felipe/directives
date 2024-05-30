import { DecimalPipe } from '@angular/common';
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Directive({
  selector: 'input[decimal]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DecimalDirective),
      multi: true,
    },
    DecimalPipe,
  ],
})
export class DecimalDirective implements ControlValueAccessor {
  constructor(private _inputEl: ElementRef) {
    this._inputEl.nativeElement.maxLength = 15;
    this._inputEl.nativeElement.style.textAlign = 'right';
  }
  isEraseEvent = false;
  @Output() updateValue: EventEmitter<string> = new EventEmitter();
  private onChange!: (value: string) => void;
  @HostListener('input', ['$event'])
  onInput(event: any) {
    if (event.inputType.includes('deleteContent')) {
      this.isEraseEvent = true;
    }
    let value = this._inputEl.nativeElement.value;
    let newValue = this.setInputValue(value);
    this.onChange(newValue);
  }
  setInputValue(value: string): string {
    if (!value) return '0,00';
    let stringValue = value.toString();
    stringValue = stringValue.replace('.', ',');
    let hasDecimal = stringValue.indexOf(',') >= 0;
    if (hasDecimal && !this.isEraseEvent) {
      let arr = stringValue.split(',');
      if (arr[1].length < 2) {
        for (var i = arr[1].length; i < 2; i++) {
          arr[1] = arr[1] + '0';
        }
      }
      stringValue = arr.join();
    }
    var digitsOnly = stringValue.replace(/\.|[^0-9]/g, '');
    let removeLeadingZeros = parseInt(
      digitsOnly === '' ? '0' : digitsOnly
    ).toString();
    removeLeadingZeros = removeLeadingZeros + (hasDecimal ? '' : '00');
    let newValue = '';
    if (removeLeadingZeros.length === 0) {
      this._inputEl.nativeElement.value = `0,00`;
      newValue = '0,00';
      return '0,00';
    } else if (removeLeadingZeros.length === 1) {
      newValue = `0,0${removeLeadingZeros}`;
    } else if (removeLeadingZeros.length === 2) {
      newValue = `0,${removeLeadingZeros}`;
    } else if (removeLeadingZeros.length > 2) {
      newValue = `${removeLeadingZeros.substring(
        0,
        removeLeadingZeros.length - 2
      )},${removeLeadingZeros.substring(
        removeLeadingZeros.length - 2,
        removeLeadingZeros.length
      )}`;
    }
    this._inputEl.nativeElement.value = newValue;
    return newValue;
  }
  writeValue(value: string): void {
    this.setInputValue(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {}
}
