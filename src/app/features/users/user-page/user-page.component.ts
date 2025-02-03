import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from '../user-form/user-form.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { UserListComponent } from '../user-list/user-list.component';
import { UserStateService } from '../../../core/services/user-state.service';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    CommonModule,
    UserFormComponent,
    UserListComponent,
    ButtonComponent,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnInit {
  isModalOpen = signal<boolean>(false);

  constructor(public userState: UserStateService) {}

  ngOnInit(): void {
    this.userState.loadUsers();
  }

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }
}
