import { Injectable, signal, computed, effect } from '@angular/core';
import { Rental } from '../models/rental';
import { RentalApiService } from './rental.service';
import { UserStateService } from './user-state.service';
import { VehicleStateService } from './vehicle-state.service';
import { User } from '../models/user';
import { Vehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root',
})
export class RentalStateService {
  rentals = signal<Rental[]>([]);
  selectedRental = signal<Rental | null>(null);
  isModalOpen = signal<boolean>(false);

  constructor(
    private rentalApiService: RentalApiService,
    private userState: UserStateService,
    private vehicleState: VehicleStateService
  ) {
    this.loadRentals();

    // 🚀 Atualiza os rentals automaticamente sempre que users ou vehicles mudam
    effect(() => {
      this.updateRentals();
    });
  }

  /**
   * Carrega a lista de aluguéis da API
   */
  loadRentals(): void {
    this.rentalApiService.getAllRentals().subscribe({
      next: (rentals) => this.rentals.set(rentals),
      error: (err) => console.error('❌ Erro ao carregar aluguéis:', err),
    });
  }

  /**
   * Computa os aluguéis e adiciona os nomes dos usuários e modelos dos veículos.
   */
  updateRentals(): void {
    const users = this.userState.users();
    const vehicles = this.vehicleState.vehicles();

    const updatedRentals = this.rentals().map((rental) => ({
      ...rental,
      userName: this.findUserName(rental.userId, users),
      vehicleModel: this.findVehicleModel(rental.vehicleId, vehicles),
    }));

    this.rentals.set(updatedRentals);
  }

  /**
   * Retorna o nome do usuário pelo ID.
   */
  private findUserName(userId: string, users: User[]): string {
    return users.find((u) => u.id === userId)?.name ?? 'Desconhecido';
  }

  /**
   * Retorna o modelo do veículo pelo ID.
   */
  private findVehicleModel(vehicleId: string, vehicles: Vehicle[]): string {
    return vehicles.find((v) => v.id === vehicleId)?.model ?? 'Desconhecido';
  }

  /**
   * Seleciona um aluguel para edição.
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
   */
  saveRental(rental: Rental): void {
    const action = rental.id
      ? this.rentalApiService.updateRental(rental.id, rental)
      : this.rentalApiService.createRental(rental);

    action.subscribe({
      next: () => {
        this.loadRentals();
        this.closeModal();
      },
      error: (err) => console.error('❌ Erro ao salvar aluguel:', err),
    });
  }

  /**
   * Remove um aluguel pelo ID.
   */
  deleteRental(id: string): void {
    this.rentalApiService.deleteRental(id).subscribe({
      next: () => this.loadRentals(),
      error: (err) => console.error('❌ Erro ao excluir aluguel:', err),
    });
  }
}
