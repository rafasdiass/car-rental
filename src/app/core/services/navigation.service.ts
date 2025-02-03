import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

/**
 * Define os caminhos das rotas disponíveis para garantir consistência.
 */
export type AppRoute = '/dashboard' | '/vehicles' | '/users' | '/rentals';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private activePage = signal<AppRoute>('/dashboard');

  /**
   * Lista centralizada de rotas disponíveis
   */
  readonly routes: AppRoute[] = [
    '/dashboard',
    '/vehicles',
    '/users',
    '/rentals',
  ];

  constructor(private router: Router) {}

  /**
   * Navega para uma rota válida e define a página ativa.
   */
  navigateTo(route: AppRoute): Observable<boolean> {
    return from(this.router.navigate([route])).pipe(
      tap((success) => {
        if (success) {
          this.activePage.set(route);
        }
      }),
      catchError((error) => {
        console.error('❌ Erro ao navegar:', error);
        throw error;
      })
    );
  }

  /**
   * Obtém a página ativa atual.
   */
  getActivePage(): AppRoute {
    return this.activePage();
  }

  /**
   * Verifica se a rota fornecida corresponde à página ativa armazenada.
   */
  isActivePage(route: AppRoute): boolean {
    return this.activePage() === route;
  }

  /**
   * Reseta a página ativa para o dashboard.
   */
  resetActivePage(): void {
    this.activePage.set('/dashboard');
  }
}
