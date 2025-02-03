import { Component, Output, EventEmitter, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Rental } from '../../../core/models/rental';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FormatDatePipe } from '../../../shared/pipes/format-date.pipe';
import { FormatCurrencyPipe } from '../../../shared/pipes/format-currency.pipe';
import { RentalStateService } from '../../../core/services/rental-state.service';

@Component({
  selector: 'app-rental-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent, FormatDatePipe, FormatCurrencyPipe],
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss'],
})
export class RentalListComponent {
  @Output() edit = new EventEmitter<Rental>();
  @Output() delete = new EventEmitter<string>();

  constructor(public rentalState: RentalStateService) {}

  /**
   * Em vez de chamar `this.rentalState.rentals()`, vamos chamar `rentalsWithMetadata()`
   * para obter userName e vehicleModel corretamente.
   */
  rentals = computed(() =>
    this.rentalState.rentalsWithMetadata().map((rental) => ({
      ...rental,
      // Garantia de não-nulo, caso algo dê errado na associação
      userName: rental.userName ?? 'Desconhecido',
      vehicleModel: rental.vehicleModel ?? 'Desconhecido',
    }))
  );

  onEdit(rental: Rental): void {
    this.edit.emit(rental);
  }

  onDelete(id: string): void {
    this.delete.emit(id);
  }
}
