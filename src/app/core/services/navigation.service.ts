import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { routes } from '../../app.routes';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private activePage = signal<string>('/dashboard');

  /**
   * Obtém automaticamente as rotas do `app.routes.ts`, garantindo que sejam `string[]`
   */
  readonly availableRoutes: string[] = routes
    .map((route) => route.path ?? '') // Garante que `undefined` vira string vazia
    .filter((path) => path && path !== '**'); // Remove strings vazias e rota coringa

  constructor(private router: Router) {}

  /**
   * Navega para uma rota válida e define a página ativa.
   */
  navigateTo(route: string): Observable<boolean> {
    if (!this.availableRoutes.includes(route)) {
      console.warn(`⚠️ Rota inválida: ${route}`);
      return from(Promise.resolve(false)); // Retorna um Observable falso para evitar erro
    }

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
  getActivePage(): string {
    return this.activePage();
  }

  /**
   * Verifica se a rota fornecida corresponde à página ativa armazenada.
   */
  isActivePage(route: string): boolean {
    return this.activePage() === route;
  }

  /**
   * Reseta a página ativa para o dashboard.
   */
  resetActivePage(): void {
    this.activePage.set('/dashboard');
  }
}
