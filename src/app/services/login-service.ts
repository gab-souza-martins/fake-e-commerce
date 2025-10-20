import { Injectable, signal } from '@angular/core';
import { User } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedIn = signal<boolean>(false);
  user = signal<User | null>(null);

  constructor() {
    const data = localStorage.getItem('loggedUser');
    if (data) {
      try {
        const parsed = JSON.parse(data) as User;
        this.user.set(parsed);
        this.isLoggedIn.set(true);
      } catch (e) {
        console.error('Error parsing loggedUser from localStorage', e);
        localStorage.removeItem('loggedUser');
        this.user.set(null);
        this.isLoggedIn.set(false);
      }
    }
  }

  getUser(): User | null {
    try {
      const data: string | null = localStorage.getItem('loggedUser');
      this.user.set(data ? (JSON.parse(data) as User) : null);
      return data ? (JSON.parse(data) as User) : null;
    } catch (e) {
      console.error('Error retrieving user token from local storage', e);
      return null;
    }
  }

  getIsLoggedIn(): boolean {
    const data: string | null = localStorage.getItem('loggedUser');
    this.isLoggedIn.set(data ? true : false);
    return data ? true : false;
  }

  logIn(user: User): boolean {
    if (user) {
      localStorage.setItem('loggedUser', JSON.stringify(user));
      this.user.set(user);
      this.isLoggedIn.set(true);
      return true;
    }
    return false;
  }

  logOut(): void {
    try {
      localStorage.removeItem('loggedUser');
      this.user.set(null);
      this.isLoggedIn.set(false);
    } catch (e) {
      console.error('Error removing user token from local storage', e);
    }
  }
}
