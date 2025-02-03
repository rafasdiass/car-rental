import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  signal,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Vehicle } from '../../../core/models/vehicle.model';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FocusDirective } from '../../../shared/directives/focus.directive';
import { FormatTextPipe } from '../../../shared/pipes/format-text.pipe';
import { FormatPlatePipe } from '../../../shared/pipes/format-plate.pipe';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    FocusDirective,
    FormatTextPipe,
    FormatPlatePipe,
  ],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.scss',
})
export class VehicleFormComponent implements OnInit, OnChanges {
  @Input() vehicle: Vehicle | null = null;
  @Output() save = new EventEmitter<Vehicle>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  isEditing = signal<boolean>(false);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vehicle'] && changes['vehicle'].currentValue) {
      if (!this.form) {
        this.initializeForm(); // ✅ Inicializa o formulário se ainda não existir
      } else {
        this.patchForm(); // ✅ Atualiza os campos do formulário quando o veículo mudar
      }
    }
  }

  private initializeForm(): void {
    this.isEditing.set(!!this.vehicle);
    this.form = this.fb.group({
      id: [this.vehicle?.id || ''], // ✅ Mantém o ID para edição
      plate: [
        this.vehicle?.plate || '',
        [Validators.required, Validators.minLength(7)],
      ],
      chassis: [this.vehicle?.chassis || '', Validators.required],
      renavam: [this.vehicle?.renavam || '', Validators.required],
      model: [this.vehicle?.model || '', Validators.required],
      brand: [this.vehicle?.brand || '', Validators.required],
      year: [
        this.vehicle?.year || new Date().getFullYear(),
        [Validators.required, Validators.min(1900)],
      ],
    });
  }

  /**
   * Atualiza os campos do formulário ao editar um veículo.
   */
  private patchForm(): void {
    if (this.vehicle && this.form) {
      this.form.patchValue({
        id: this.vehicle.id,
        plate: this.vehicle.plate,
        chassis: this.vehicle.chassis,
        renavam: this.vehicle.renavam,
        model: this.vehicle.model,
        brand: this.vehicle.brand,
        year: this.vehicle.year,
      });
      this.isEditing.set(true);
    }
  }

  submit(): void {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }

  cancelForm(): void {
    this.cancel.emit();
  }
}
