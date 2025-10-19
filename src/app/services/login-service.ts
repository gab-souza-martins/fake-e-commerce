import { Injectable } from '@angular/core';
import { User } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  saveUserToken(token: string): void {
    try {
      localStorage.setItem('userToken', token);
    } catch (e) {
      console.error('Error saving user token to local storage', e);
    }
  }

  getUserToken(): string | null {
    try {
      return localStorage.getItem('userToken');
    } catch (e) {
      console.error('Error retrieving user token from local storage', e);
      return null;
    }
  }

  getIsLoggedIn(): boolean {
    return this.getUserToken() !== null;
  }

  logIn(user: User): boolean {
    if (user) {
      this.saveUserToken(user.token);
      return true;
    }
    return false;
  }

  logOut(): void {
    try {
      localStorage.removeItem('userToken');
    } catch (e) {
      console.error('Error removing user token from local storage', e);
    }
  }
}
