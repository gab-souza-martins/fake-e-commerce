import { Injectable, signal } from '@angular/core';
import { User } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _isLoggedIn = signal<boolean>(false);
  readonly isLoggedIn = this._isLoggedIn;

  private _user = signal<User | null>(null);
  readonly user = this._user;

  getUser(): User | null {
    try {
      if (this._user) {
        return this._user();
      }
      return null;
    } catch (e) {
      console.error('Error retrieving user token from local storage', e);
      return null;
    }
  }

  getIsLoggedIn(): boolean {
    return this._isLoggedIn();
  }

  logIn(user: User): boolean {
    if (user) {
      localStorage.setItem('loggedUser', JSON.stringify(user));
      this._user.set(user);
      this._isLoggedIn.set(true);
      return true;
    }
    return false;
  }

  logOut(): void {
    try {
      localStorage.removeItem('loggedUser');
      this._user.set(null);
      this._isLoggedIn.set(false);
    } catch (e) {
      console.error('Error removing user token from local storage', e);
    }
  }
}
