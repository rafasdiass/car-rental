import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() text: string = 'Button';
  @Input() color:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md'; // Suporte a tamanhos Bootstrap
  @Input() icon?: string; // Ícone opcional, usa `Bootstrap Icons`
  @Output() action = new EventEmitter<void>();

  onClick(): void {
    this.action.emit();
  }
}
