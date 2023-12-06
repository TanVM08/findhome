import { DecimalPipe } from '@angular/common';
import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appCurrencyFormat]',
})
export class CurrencyFormatDirective {
  constructor(private el: ElementRef, private decimalPipe: DecimalPipe) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    let inputVal: string = event.target.value;
    const cleanValue = inputVal.replace(/[^0-9]/g, '');
    const formattedValue = this.formatNumber(+cleanValue);
    this.el.nativeElement.value = formattedValue;
  }

  private formatNumber(value: number): any {
    if (isNaN(value)) {
      return '';
    }
    return this.decimalPipe.transform(value, '1.0-0');
  }
}
