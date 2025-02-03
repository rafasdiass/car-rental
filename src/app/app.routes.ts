import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { RentalsPageComponent } from './features/rentals/rentals-page/rentals-page.component';
import { UserPageComponent } from './features/users/user-page/user-page.component';
import { VehiclePageComponent } from './features/vehicles/vehicle-page/vehicle-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Inicia no Dashboard
  { path: 'dashboard', component: DashboardComponent },
  { path: 'rentals', component: RentalsPageComponent },
  { path: 'users', component: UserPageComponent }, // Corrigido para "users"
  { path: 'vehicles', component: VehiclePageComponent },
  { path: '**', redirectTo: 'dashboard' }, // Se não encontrar a rota, volta para Dashboard
];
