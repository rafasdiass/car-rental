import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPhone',
  standalone: true,
})
export class FormatPhonePipe implements PipeTransform {
  transform(phone: string): string {
    if (!phone) return '';

    // Remove caracteres não numéricos
    const cleaned = phone.replace(/\D/g, '');

    // Formato para telefones brasileiros
    if (cleaned.length === 11) {
      return `(${cleaned.substring(0, 2)}) ${cleaned.substring(
        2,
        7
      )}-${cleaned.substring(7)}`;
    }
    if (cleaned.length === 10) {
      return `(${cleaned.substring(0, 2)}) ${cleaned.substring(
        2,
        6
      )}-${cleaned.substring(6)}`;
    }

    return phone; 
  }
}
