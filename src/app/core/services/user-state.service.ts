import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  users = signal<User[]>([]); // ✅ Garantindo que sempre seja um array
  selectedUser = signal<User | null>(null);
  isModalOpen = signal<boolean>(false); // ✅ Controle do modal

  constructor(private userApiService: UserApiService) {
    this.loadUsers();
  }

  /**
   * Carrega a lista de locatários da API.
   */
  loadUsers(): void {
    this.userApiService.getAllUsers().subscribe({
      next: (data) => this.users.set(data),
      error: (err) => console.error('❌ Erro ao carregar locatários:', err),
    });
  }

  /**
   * Retorna a lista de locatários armazenados.
   */
  getUsers(): User[] {
    return this.users(); // ✅ Agora retorna um array corretamente
  }

  /**
   * Seleciona um locatário e abre o modal para edição.
   */
  selectUser(user: User): void {
    this.selectedUser.set(user);
    this.isModalOpen.set(true);
  }

  /**
   * Fecha o modal e reseta o locatário selecionado.
   */
  closeModal(): void {
    this.selectedUser.set(null);
    this.isModalOpen.set(false);
  }

  /**
   * Adiciona um novo locatário ou atualiza um existente.
   */
  saveUser(user: User): void {
    const action = user.id
      ? this.userApiService.updateUser(user.id, user)
      : this.userApiService.createUser(user);

    action.subscribe({
      next: () => {
        this.loadUsers();
        this.closeModal(); // ✅ Fecha o modal automaticamente após salvar
      },
      error: (err) => console.error('❌ Erro ao salvar locatário:', err),
    });
  }

  /**
   * Remove um locatário pelo ID.
   */
  deleteUser(id: string): void {
    this.userApiService.deleteUser(id).subscribe({
      next: () => {
        this.loadUsers(); // ✅ Agora recarrega a lista corretamente
        console.log(`👤 Locatário ${id} removido com sucesso.`);
      },
      error: (err) => console.error('❌ Erro ao excluir locatário:', err),
    });

    this.selectedUser.set(null);
  }
}
