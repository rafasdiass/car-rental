import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
  standalone: true,
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';

    const date = new Date(value);
    if (isNaN(date.getTime())) return value.toString(); // Retorna o valor original se não for uma data válida

    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
