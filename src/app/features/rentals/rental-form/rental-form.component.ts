import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Rental } from '../../../core/models/rental.model';
import { User } from '../../../core/models/user.model';
import { Vehicle } from '../../../core/models/vehicle.model';
import { RentalStateService } from '../../../core/services/rental-state.service';
import { UserStateService } from '../../../core/services/user-state.service';
import { VehicleStateService } from '../../../core/services/vehicle-state.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FormatDatePipe } from '../../../shared/pipes/format-date.pipe';
import { FormatCurrencyPipe } from '../../../shared/pipes/format-currency.pipe';

@Component({
  selector: 'app-rental-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    FormatDatePipe,
    FormatCurrencyPipe,
  ],
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.scss'],
})
export class RentalFormComponent implements OnInit, OnChanges {
  @Input() rental: Rental | null = null;
  @Output() save = new EventEmitter<Rental>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  isEditing = signal<boolean>(false);
  users = signal<User[]>([]);
  vehicles = signal<Vehicle[]>([]);

  constructor(
    private fb: FormBuilder,
    private rentalState: RentalStateService,
    private userState: UserStateService,
    private vehicleState: VehicleStateService
  ) {
    // Inicia os signals com as listas atuais, se já estiverem carregadas.
    this.users.set(this.userState.users());
    this.vehicles.set(this.vehicleState.vehicles());
  }

  ngOnInit(): void {
    this.initializeForm();
    // Garante que, se ainda não estiverem carregados, agora serão:
    this.userState.loadUsers();
    this.vehicleState.loadVehicles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rental'] && changes['rental'].currentValue) {
      this.patchForm();
    }
  }

  private initializeForm(): void {
    this.isEditing.set(!!this.rental);
    this.form = this.fb.group({
      id: [this.rental?.id || ''],
      userId: [this.rental?.userId || '', Validators.required],
      vehicleId: [this.rental?.vehicleId || '', Validators.required],
      startDate: [this.rental?.startDate || '', Validators.required],
      endDate: [this.rental?.endDate || '', Validators.required],
      totalPrice: [
        this.rental?.totalPrice || 0,
        [Validators.required, Validators.min(1)],
      ],
      status: [this.rental?.status || 'active', Validators.required],
    });
  }

  private patchForm(): void {
    if (this.rental && this.form) {
      this.form.patchValue(this.rental);
      this.isEditing.set(true);
    }
  }

  submit(): void {
    if (this.form.valid) {
      // Emite o objeto Rental montado do form
      this.save.emit(this.form.value);
    }
  }

  cancelForm(): void {
    this.cancel.emit();
  }
}
