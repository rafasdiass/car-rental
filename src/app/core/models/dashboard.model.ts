export interface DashboardSummary {
  totalVehicles: number;
  totalUsers: number;
  totalRentals: number;
}

export interface ShortVehicle {
  id: string;
  model: string;
  plate: string;
  year: number;
}

export interface ShortRental {
  id: string;
  userId: string;
  vehicleId: string;
  status: string;
}

export interface ActiveRental {
  id: string;
  userName: string;
  vehicleModel: string;
  startDate: string;
  endDate: string;
}
