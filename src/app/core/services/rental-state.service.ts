import { Injectable, signal, computed } from '@angular/core';
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
  /**
   * Armazena a lista "bruta" de aluguéis vindos da API
   */
  private _rentals = signal<Rental[]>([]);

  /**
   * Expor um getter para acessar `_rentals`
   */
  get rentals() {
    return this._rentals;
  }

  /**
   * Lista de aluguéis com dados de usuário e veículo "conectados"
   * Essa lista é derivada (computed) com base em `_rentals`, `UserStateService` e `VehicleStateService`.
   */
  rentalsWithMetadata = computed(() => {
    const users = this.userState.users();
    const vehicles = this.vehicleState.vehicles();

    return this._rentals().map((rental) => ({
      ...rental,
      userName: this.findUserName(rental.userId, users),
      vehicleModel: this.findVehicleModel(rental.vehicleId, vehicles),
    }));
  });

  selectedRental = signal<Rental | null>(null);
  isModalOpen = signal<boolean>(false);

  constructor(
    private rentalApiService: RentalApiService,
    private userState: UserStateService,
    private vehicleState: VehicleStateService
  ) {
    // Carregamos a lista inicial de rentals
    this.loadRentals();

    // Se quiser, podemos também carregar usuários e veículos aqui,
    // para garantir que quando a tela carregar, já temos estes dados:
    this.userState.loadUsers();
    this.vehicleState.loadVehicles();
  }

  /**
   * Carrega a lista de aluguéis da API.
   */
  loadRentals(): void {
    this.rentalApiService.getAllRentals().subscribe({
      next: (rentals) => this._rentals.set(rentals),
      error: (err) => console.error('❌ Erro ao carregar aluguéis:', err),
    });
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
}
