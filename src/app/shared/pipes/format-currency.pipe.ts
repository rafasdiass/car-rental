import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency',
  standalone: true,
})
export class FormatCurrencyPipe implements PipeTransform {
  transform(value: number, currencyCode: string = 'BRL'): string {
    if (value == null || isNaN(value)) return 'R$ 0,00';

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currencyCode,
    }).format(value);
  }
}
