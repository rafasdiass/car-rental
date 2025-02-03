import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  menuRoutes: string[];

  constructor(public navigationService: NavigationService) {
    this.menuRoutes = this.navigationService.availableRoutes; // ✅ Agora só é acessado após inicialização
  }

  /**
   * Navega para a rota desejada.
   */
  navigate(route: string) {
    this.navigationService.navigateTo(route).subscribe();
  }

  /**
   * Verifica se a página está ativa.
   */
  isActive(route: string): boolean {
    return this.navigationService.isActivePage(route);
  }

  /**
   * Retorna o ícone apropriado para cada rota.
   */
  getIcon(route: string): string {
    const icons: Record<string, string> = {
      dashboard: 'bi-house-door',
      veiculos: 'bi-car-front-fill',
      locatarios: 'bi-people-fill',
      alugueis: 'bi-receipt-cutoff',
    };
    return icons[route] || 'bi-question-circle';
  }
}
