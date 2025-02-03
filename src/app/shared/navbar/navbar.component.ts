import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  NavigationService,
  AppRoute,
} from '../../core/services/navigation.service';
import { ButtonComponent } from '../components/button/button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(public navigationService: NavigationService) {}

  /**
   * Navega para a rota desejada.
   */
  navigate(route: AppRoute) {
    this.navigationService.navigateTo(route).subscribe();
  }

  /**
   * Verifica se a página está ativa.
   */
  isActive(route: AppRoute): boolean {
    return this.navigationService.isActivePage(route);
  }

  /**
   * Retorna o ícone apropriado para cada rota.
   */
  getIcon(route: AppRoute): string {
    const icons: Record<AppRoute, string> = {
      '/dashboard': 'bi-house-door',
      '/vehicles': 'bi-car-front-fill',
      '/users': 'bi-people-fill',
      '/rentals': 'bi-receipt-cutoff',
    };
    return icons[route];
  }
}
