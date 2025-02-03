import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../../core/models/vehicle';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',
})
export class VehicleListComponent {
  @Input() vehicles: Vehicle[] = [];
  @Output() edit = new EventEmitter<Vehicle>();
  @Output() delete = new EventEmitter<string>();

  onEdit(vehicle: Vehicle): void {
    this.edit.emit(vehicle); // ✅ Emite evento de edição para o pai
  }

  onDelete(id: string): void {
    this.delete.emit(id); // ✅ Emite evento de exclusão para o pai
  }
}
