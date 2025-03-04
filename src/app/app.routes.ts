import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { RentalPageComponent } from './features/rentals/rental-page/rental-page.component';
import { UserPageComponent } from './features/users/user-page/user-page.component';
import { VehiclePageComponent } from './features/vehicles/vehicle-page/vehicle-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Inicia no Dashboard
  { path: 'dashboard', component: DashboardComponent },
  { path: 'veiculos', component: VehiclePageComponent },
  { path: 'alugueis', component: RentalPageComponent },
  { path: 'locatarios', component: UserPageComponent }, // Corrigido para "users"
  { path: '**', redirectTo: 'dashboard' }, // Se não encontrar a rota, volta para Dashboard
];
