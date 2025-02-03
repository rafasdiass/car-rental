import { Component } from '@angular/core';
import { VehiclePageComponent } from "../../vehicles/vehicle-page/vehicle-page.component";

@Component({
  selector: 'app-dashboard',
  imports: [VehiclePageComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
