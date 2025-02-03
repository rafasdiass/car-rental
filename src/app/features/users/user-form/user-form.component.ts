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
import { User } from '../../../core/models/user';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FormatPhonePipe } from '../../../shared/pipes/format-phone.pipe'; // ✅ Adicionado Pipe corretamente
import { FocusDirective } from '../../../shared/directives/focus.directive'; // ✅ Adicionado a diretiva de foco

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    FormatPhonePipe, // ✅ Registrado o pipe
    FocusDirective, // ✅ Registrada a diretiva
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input() user: User | null = null;
  @Output() save = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  isEditing = signal<boolean>(false);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && changes['user'].currentValue) {
      if (!this.form) {
        this.initializeForm();
      } else {
        this.patchForm();
      }
    }
  }

  private initializeForm(): void {
    this.isEditing.set(!!this.user);
    this.form = this.fb.group({
      id: [this.user?.id || ''],
      name: [this.user?.name || '', Validators.required],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      phone: [this.user?.phone || '', Validators.required],
      document: [this.user?.document || '', Validators.required],
      address: [this.user?.address || '', Validators.required],
    });
  }

  private patchForm(): void {
    if (this.user && this.form) {
      this.form.patchValue(this.user);
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
