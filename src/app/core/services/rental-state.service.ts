import { Injectable, signal } from '@angular/core';
import { Rental } from '../models/rental';
import { RentalApiService } from './rental.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RentalStateService {
  rentals = signal<Rental[]>([]);
  selectedRental = signal<Rental | null>(null);
  isModalOpen = signal<boolean>(false);

  constructor(private rentalApiService: RentalApiService) {
    this.loadRentals();
  }

  /**
   * Carrega a lista de aluguéis da API.
   */
  loadRentals(): void {
    this.rentalApiService.getAllRentals().subscribe({
      next: (rentals: Rental[]) => this.rentals.set(rentals),
      error: (error: Error) =>
        console.error('❌ Erro ao carregar aluguéis:', error),
    });
  }

  /**
   * Seleciona um aluguel e abre o modal para edição.
   * @param rental Aluguel selecionado
   */
  selectRental(rental: Rental): void {
    this.selectedRental.set(rental);
    this.isModalOpen.set(true);
  }

  /**
   * Fecha o modal e reseta o aluguel selecionado.
   */
  closeModal(): void {
    this.selectedRental.set(null);
    this.isModalOpen.set(false);
  }

  /**
   * Adiciona um novo aluguel ou atualiza um existente.
   * @param rental Dados do aluguel a ser salvo
   */
  saveRental(rental: Rental): void {
    const action: Observable<Rental> = rental.id
      ? this.rentalApiService.updateRental(rental.id, rental)
      : this.rentalApiService.createRental(rental);

    action.subscribe({
      next: () => {
        this.loadRentals();
        this.closeModal();
      },
      error: (error: Error) =>
        console.error('❌ Erro ao salvar aluguel:', error),
    });
  }

  /**
   * Remove um aluguel pelo ID.
   * @param id Identificador do aluguel a ser removido
   */
  deleteRental(id: string): void {
    this.rentalApiService.deleteRental(id).subscribe({
      next: () => {
        this.loadRentals();
        console.log(`📝 Aluguel ${id} removido com sucesso.`);
      },
      error: (error: Error) =>
        console.error('❌ Erro ao excluir aluguel:', error),
    });

    this.selectedRental.set(null);
  }
}
