import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, catchError, tap, throwError, of } from 'rxjs';
import { Vehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehicleApiService {
  private readonly endpoint = '/vehicles';
  private readonly serviceName = '[VehicleApiService]';

  constructor(private apiService: ApiService) {}

  /**
   * Obtém todos os veículos.
   */
  getAllVehicles(): Observable<Vehicle[]> {
    return this.apiService.get<Vehicle[]>(this.endpoint).pipe(
      tap(() => this.logSuccess('getAllVehicles')),
      catchError((error) =>
        this.handleError<Vehicle[]>('getAllVehicles', error, [])
      )
    );
  }

  /**
   * Obtém um veículo pelo ID.
   */
  getVehicleById(id: string): Observable<Vehicle> {
    return this.apiService.get<Vehicle>(`${this.endpoint}/${id}`).pipe(
      tap(() => this.logSuccess(`getVehicleById(${id})`)),
      catchError((error) => this.handleError<Vehicle>('getVehicleById', error))
    );
  }

  /**
   * Cria um novo veículo.
   */
  createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.apiService.post<Vehicle, Vehicle>(this.endpoint, vehicle).pipe(
      tap(() => this.logSuccess('createVehicle', vehicle)),
      catchError((error) => this.handleError<Vehicle>('createVehicle', error))
    );
  }

  /**
   * Atualiza um veículo pelo ID.
   */
  updateVehicle(id: string, vehicle: Vehicle): Observable<Vehicle> {
    return this.apiService
      .put<Vehicle, Vehicle>(`${this.endpoint}/${id}`, vehicle)
      .pipe(
        tap(() => this.logSuccess(`updateVehicle(${id})`, vehicle)),
        catchError((error) => this.handleError<Vehicle>('updateVehicle', error))
      );
  }

  /**
   * Remove um veículo pelo ID.
   */
  deleteVehicle(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`).pipe(
      tap(() => this.logSuccess(`deleteVehicle(${id})`)),
      catchError((error) => this.handleError<void>('deleteVehicle', error))
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

    // Se existir um fallback (como []), retorna um Observable com esse valor
    if (fallback !== undefined) {
      return of(fallback);
    }

    // Se não houver fallback, lança um erro
    return throwError(
      () => new Error(`Erro ao executar ${method}: ${error.message || error}`)
    );
  }
}
