import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental.model';

@Injectable({
  providedIn: 'root',
})
export class RentalApiService {
  private readonly endpoint: string = '/rentals';
  private readonly serviceName: string = '[RentalApiService]';

  constructor(private apiService: ApiService) {}

  /**
   * Obtém todos os aluguéis.
   */
  getAllRentals(): Observable<Rental[]> {
    return this.apiService.get<Rental[]>(this.endpoint);
  }

  /**
   * Obtém um aluguel pelo ID.
   * @param id Identificador do aluguel
   */
  getRentalById(id: string): Observable<Rental> {
    return this.apiService.get<Rental>(`${this.endpoint}/${id}`);
  }

  /**
   * Cria um novo aluguel.
   * @param rental Dados do aluguel a ser criado
   */
  createRental(rental: Rental): Observable<Rental> {
    return this.apiService.post<Rental, Rental>(this.endpoint, rental);
  }

  /**
   * Atualiza um aluguel pelo ID.
   * @param id Identificador do aluguel a ser atualizado
   * @param rental Dados do aluguel atualizado
   */
  updateRental(id: string, rental: Rental): Observable<Rental> {
    return this.apiService.put<Rental, Rental>(
      `${this.endpoint}/${id}`,
      rental
    );
  }

  /**
   * Remove um aluguel pelo ID.
   * @param id Identificador do aluguel a ser removido
   */
  deleteRental(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}
