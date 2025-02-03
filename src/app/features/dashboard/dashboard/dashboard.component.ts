import { Component, OnInit } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  UpperCasePipe,
  SlicePipe,
  DecimalPipe,
} from '@angular/common';
import { DashboardService } from '../../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DatePipe, UpperCasePipe, SlicePipe, DecimalPipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private readonly dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.loadData();
  }

  get summary() {
    return this.dashboardService.summary();
  }

  get latestVehicles() {
    return this.dashboardService.latestVehicles();
  }

  get activeRentals() {
    return this.dashboardService.activeRentals();
  }

  get shortRentals() {
    return this.dashboardService.shortRentals();
  }

  get currentDate() {
    return this.dashboardService.currentDate();
  }
}
