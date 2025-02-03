import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, catchError, tap, throwError, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private readonly endpoint = '/users';
  private readonly serviceName = '[UserApiService]';

  constructor(private apiService: ApiService) {}

  /**
   * Obtém todos os usuários (locatários).
   */
  getAllUsers(): Observable<User[]> {
    return this.apiService.get<User[]>(this.endpoint).pipe(
      tap(() => this.logSuccess('getAllUsers')),
      catchError((error) => this.handleError<User[]>('getAllUsers', error, []))
    );
  }

  /**
   * Obtém um usuário pelo ID.
   */
  getUserById(id: string): Observable<User> {
    return this.apiService.get<User>(`${this.endpoint}/${id}`).pipe(
      tap(() => this.logSuccess(`getUserById(${id})`)),
      catchError((error) => this.handleError<User>('getUserById', error))
    );
  }

  /**
   * Cria um novo usuário (locatário).
   */
  createUser(user: User): Observable<User> {
    return this.apiService.post<User, User>(this.endpoint, user).pipe(
      tap(() => this.logSuccess('createUser', user)),
      catchError((error) => this.handleError<User>('createUser', error))
    );
  }

  /**
   * Atualiza um usuário pelo ID.
   */
  updateUser(id: string, user: User): Observable<User> {
    return this.apiService.put<User, User>(`${this.endpoint}/${id}`, user).pipe(
      tap(() => this.logSuccess(`updateUser(${id})`, user)),
      catchError((error) => this.handleError<User>('updateUser', error))
    );
  }

  /**
   * Remove um usuário pelo ID.
   */
  deleteUser(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`).pipe(
      tap(() => this.logSuccess(`deleteUser(${id})`)),
      catchError((error) => this.handleError<void>('deleteUser', error))
    );
  }

  /**
   * Registra mensagens de sucesso nos logs.
   */
  private logSuccess(method: string, data?: any): void {
    console.info(`✅ ${this.serviceName} ${method}`, data || '');
  }

  /**
   * Manipula erros de requisição HTTP.
   */
  private handleError<T>(
    method: string,
    error: any,
    fallback?: T
  ): Observable<T> {
    console.error(`❌ ${this.serviceName} ${method} ERROR:`, error);

    if (fallback !== undefined) {
      return of(fallback);
    }

    return throwError(
      () => new Error(`Erro ao executar ${method}: ${error.message || error}`)
    );
  }
}
