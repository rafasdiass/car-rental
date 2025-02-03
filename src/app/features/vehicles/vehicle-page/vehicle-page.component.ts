import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleFormComponent } from '../vehicle-form/vehicle-form.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { VehicleListComponent } from '../vehicle-list/vehicle-list.component';
import { VehicleStateService } from '../../../core/services/vehicle-state.service';

@Component({
  selector: 'app-vehicle-page',
  standalone: true,
  imports: [
    CommonModule,
    VehicleFormComponent,
    VehicleListComponent,
    ButtonComponent,
  ],
  templateUrl: './vehicle-page.component.html',
  styleUrl: './vehicle-page.component.scss',
})
export class VehiclePageComponent implements OnInit {
  isModalOpen = signal<boolean>(false);

  constructor(public vehicleState: VehicleStateService) {}

  ngOnInit(): void {
    this.vehicleState.loadVehicles();
  }

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }
}
