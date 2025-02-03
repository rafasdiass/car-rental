export interface Rental {
  id: string;
  userId: string; // ID do locatário
  vehicleId: string; // ID do veículo
  startDate: string; // Data de início do aluguel (ISO 8601)
  endDate: string; // Data de término do aluguel (ISO 8601)
  totalPrice: number; // Valor total do aluguel
  status: 'active' | 'completed' | 'canceled'; // Status do aluguel

  
  userName?: string;
  vehicleModel?: string;
}
