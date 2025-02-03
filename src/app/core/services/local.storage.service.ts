import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  /**
   * Armazena um item no LocalStorage.
   * @param key Chave do item.
   * @param value Valor a ser armazenado.
   */
  setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('❌ Erro ao salvar no LocalStorage:', error);
    }
  }

  /**
   * Obtém um item do LocalStorage.
   * @param key Chave do item.
   * @returns O valor armazenado ou null se não existir.
   */
  getItem<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('❌ Erro ao ler do LocalStorage:', error);
      return null;
    }
  }

  /**
   * Remove um item do LocalStorage.
   * @param key Chave do item a ser removido.
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('❌ Erro ao remover do LocalStorage:', error);
    }
  }

  /**
   * Limpa todo o LocalStorage.
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('❌ Erro ao limpar o LocalStorage:', error);
    }
  }
}
