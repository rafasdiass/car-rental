import { Injectable, signal } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { VehicleApiService } from './vehicle-api.service';

@Injectable({
  providedIn: 'root',
})
export class VehicleStateService {
  vehicles = signal<Vehicle[]>([]); // ✅ Garantindo que sempre seja um array
  selectedVehicle = signal<Vehicle | null>(null);
  isModalOpen = signal<boolean>(false); // ✅ Controle do modal

  constructor(private vehicleApiService: VehicleApiService) {
    this.loadVehicles();
  }

  /**
   * Carrega a lista de veículos da API.
   */
  loadVehicles(): void {
    this.vehicleApiService.getAllVehicles().subscribe({
      next: (data) => this.vehicles.set(data),
      error: (err) => console.error('❌ Erro ao carregar veículos:', err),
    });
  }

  /**
   * Retorna a lista de veículos armazenados.
   */
  getVehicles(): Vehicle[] {
    return this.vehicles(); // ✅ Agora retorna um array corretamente
  }

  /**
   * Seleciona um veículo e abre o modal para edição.
   */
  selectVehicle(vehicle: Vehicle): void {
    this.selectedVehicle.set(vehicle);
    this.isModalOpen.set(true);
  }

  /**
   * Fecha o modal e reseta o veículo selecionado.
   */
  closeModal(): void {
    this.selectedVehicle.set(null);
    this.isModalOpen.set(false);
  }

  /**
   * Adiciona um novo veículo ou atualiza um existente.
   */
  saveVehicle(vehicle: Vehicle): void {
    const action = vehicle.id
      ? this.vehicleApiService.updateVehicle(vehicle.id, vehicle)
      : this.vehicleApiService.createVehicle(vehicle);

    action.subscribe({
      next: () => {
        this.loadVehicles();
        this.closeModal(); // ✅ Fecha o modal automaticamente após salvar
      },
      error: (err) => console.error('❌ Erro ao salvar veículo:', err),
    });
  }

  /**
   * Remove um veículo pelo ID.
   */
  deleteVehicle(id: string): void {
    this.vehicleApiService.deleteVehicle(id).subscribe({
      next: () => {
        this.loadVehicles(); // ✅ Agora recarrega a lista corretamente
        console.log(`🚗 Veículo ${id} removido com sucesso.`);
      },
      error: (err) => console.error('❌ Erro ao excluir veículo:', err),
    });

    this.selectedVehicle.set(null);
  }
}
