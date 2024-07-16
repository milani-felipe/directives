import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    this.filterValue(event.target.value);
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedInput: string = event.clipboardData!.getData('text/plain');
    const filteredInput: string = this.filterString(pastedInput);
    document.execCommand('insertText', false, filteredInput);
  }

  private filterValue(value: string) {
    const filteredValue = this.filterString(value);
    this.el.nativeElement.value = filteredValue;
  }

  private filterString(value: string): string {
    return value.replace(/[^0-9]/g, '');
  }
}
