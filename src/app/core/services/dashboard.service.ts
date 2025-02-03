import { Injectable, computed, signal } from '@angular/core';
import { VehicleStateService } from './vehicle-state.service';
import { UserStateService } from './user-state.service';
import { RentalStateService } from './rental-state.service';

// Modelos de dados de domínio
import { User } from '../models/user.model';
import { Vehicle } from '../models/vehicle.model';
import { Rental } from '../models/rental.model';

// Interfaces específicas para o dashboard
import {
  ActiveRental,
  DashboardSummary,
  ShortVehicle,
  ShortRental,
} from '../models/dashboard.model';

/**
 * Service responsável por agrupar (facade) as informações de veículos,
 * usuários e aluguéis para serem consumidas pelo Dashboard.
 * Oferece signals e computed fortemente tipadas para facilitar a exibição
 * e garantir boas práticas de clean code.
 */
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  /**
   * Retorna um resumo quantitativo dos registros no sistema.
   */
  summary = computed<DashboardSummary>(() => {
    const totalVehicles: number = this.vehicleState.vehicles().length;
    const totalUsers: number = this.userState.users().length;
    const totalRentals: number = this.rentalState.rentals().length;

    return {
      totalVehicles,
      totalUsers,
      totalRentals,
    };
  });

  /**
   * Lista "enxuta" de veículos, retornando apenas os três primeiros.
   * Ajuste para os últimos três com slice(-3), se desejar.
   */
  latestVehicles = computed<ShortVehicle[]>(() => {
    const allVehicles: Vehicle[] = this.vehicleState.vehicles();
    const selectedVehicles: Vehicle[] = allVehicles.slice(0, 3);

    return selectedVehicles.map((vehicle: Vehicle) => ({
      id: vehicle.id,
      model: vehicle.model,
      plate: vehicle.plate,
      year: vehicle.year,
    }));
  });

  /**
   * Retorna uma lista resumida de todos os aluguéis,
   * contendo apenas os campos básicos para o Dashboard.
   */
  shortRentals = computed<ShortRental[]>(() => {
    const rentals: Rental[] = this.rentalState.rentals();

    return rentals.map((rental: Rental) => ({
      id: rental.id,
      userId: rental.userId,
      vehicleId: rental.vehicleId,
      status: rental.status,
    }));
  });

  /**
   * Retorna aluguéis com status 'active' e enriquece cada um com
   * nome do usuário e modelo do veículo. Útil para exibir
   * uma listagem de aluguéis ativos no Dashboard.
   */
  activeRentals = computed<ActiveRental[]>(() => {
    const rentals: Rental[] = this.rentalState.rentals();
    const users: User[] = this.userState.users();
    const vehicles: Vehicle[] = this.vehicleState.vehicles();

    const active: Rental[] = rentals.filter(
      (rental: Rental) => rental.status === 'active'
    );

    return active.map((rental: Rental) => {
      const user: User | undefined = users.find((u) => u.id === rental.userId);
      const vehicle: Vehicle | undefined = vehicles.find(
        (v) => v.id === rental.vehicleId
      );

      return {
        id: rental.id,
        userName: user?.name ?? 'Desconhecido',
        vehicleModel: vehicle?.model ?? 'Desconhecido',
        startDate: rental.startDate,
        endDate: rental.endDate,
      };
    });
  });

  /**
   * Sinal simples que pode armazenar a data/hora atual.
   * Pode ser atualizada periodicamente caso haja necessidade
   * de exibir o tempo em real time no Dashboard.
   */
  currentDate = signal<Date>(new Date());

  /**
   * Construtor recebe os serviços de estado que fornecem os dados
   * de veículos, usuários e aluguéis.
   */
  constructor(
    private readonly vehicleState: VehicleStateService,
    private readonly userState: UserStateService,
    private readonly rentalState: RentalStateService
  ) {}

  /**
   * Invoca os métodos de carregamento dos dados em seus respectivos
   * serviços de estado. Útil para ser chamado no `ngOnInit` do componente
   * de Dashboard, garantindo que tudo estará disponível para as signals.
   */
  loadData(): void {
    this.vehicleState.loadVehicles();
    this.userState.loadUsers();
    this.rentalState.loadRentals();
  }
}
