import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[input-number]',
  standalone: true,
})
export class OnlyNumberDirective {
  @Input() OnlyNumber: boolean = true;
  @Input() allowDot: boolean = false;
  @Input() allowComma: boolean = false;

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    let e = event;
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
        // Allow: home, end, left, right
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

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    if (!this.OnlyNumber) {
      return;
    }
    event.preventDefault();
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    let pastedInput: string = clipboardData.getData('text');

    // Build regex based on allowed characters
    let regexString = '[^0-9';
    if (this.allowDot) {
      regexString += '\\.';
    }
    if (this.allowComma) {
      regexString += ',';
    }
    regexString += ']';

    const regex = new RegExp(regexString, 'g');
    let sanitized = pastedInput.replace(regex, '');

    // Insert sanitized value at the current cursor position
    const input = this.el.nativeElement;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const currentValue = input.value;
    input.value =
      currentValue.slice(0, start) + sanitized + currentValue.slice(end);

    // Move cursor to the end of the inserted text
    const newCursorPos = start + sanitized.length;
    setTimeout(() => {
      input.setSelectionRange(newCursorPos, newCursorPos);
      input.dispatchEvent(new Event('input')); // Notify Angular forms of the change
    });
  }
}
