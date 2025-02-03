import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalFormComponent } from '../rental-form/rental-form.component';
import { RentalListComponent } from '../rental-list/rental-list.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RentalStateService } from '../../../core/services/rental-state.service';
import { Rental } from '../../../core/models/rental'; // ✅ Importação correta do model Rental

@Component({
  selector: 'app-rental-page',
  standalone: true,
  imports: [
    CommonModule,
    RentalFormComponent, // ✅ Certifique-se de que está importado
    RentalListComponent, // ✅ Certifique-se de que está importado
    ButtonComponent,
  ],
  templateUrl: './rental-page.component.html',
  styleUrl: './rental-page.component.scss',
})
export class RentalPageComponent implements OnInit {
  isModalOpen = signal<boolean>(false);

  constructor(public rentalState: RentalStateService) {}

  ngOnInit(): void {
    this.rentalState.loadRentals();
  }

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  /**
   * Corrige o erro onde um evento do tipo 'Event' estava sendo passado.
   * Agora, garantimos que `rental` é do tipo `Rental`.
   */
  onEditRental(rental: Rental): void {
    this.rentalState.selectRental(rental);
    this.openModal();
  }
}
