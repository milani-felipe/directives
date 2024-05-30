import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[onlyNumber]',
  standalone: true,
})
export class OnlyNumberDirective {
  constructor(privateel: ElementRef) {}
  @Input() OnlyNumber: boolean = true;
  @Input() allowDot: boolean = false;
  @Input() allowComma: boolean = false;
  //188 for Comma
  //190 for dot
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    let e = <KeyboardEvent>event;
    let allowedKeys = [46, 8, 9, 27, 13, 110];
    if (this.allowDot) {
      allowedKeys.push(190);
    }
    if (this.allowComma) {
      allowedKeys.push(188);
    }
    if (this.OnlyNumber) {
      if (
        allowedKeys.indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+V
        (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
        // Allow: home, end, left, right                (
        (e.keyCode >= 35 && e.keyCode <= 39)
      ) {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress
      if (
        (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
        (e.keyCode < 96 || e.keyCode > 105)
      ) {
        e.preventDefault();
      }
    }
  }
}
