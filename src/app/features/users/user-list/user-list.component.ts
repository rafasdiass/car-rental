import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../core/models/user.model';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  @Input() users: User[] = [];
  @Output() edit = new EventEmitter<User>();
  @Output() delete = new EventEmitter<string>();

  onEdit(user: User): void {
    this.edit.emit(user);
  }

  onDelete(id: string): void {
    this.delete.emit(id);
  }
}
