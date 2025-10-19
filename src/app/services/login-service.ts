import { Injectable } from '@angular/core';

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

  signIn(username: string, email: string, password: string): boolean {
    if (username && email && password) {
      const mockToken = crypto.randomUUID();
      this.saveUserToken(mockToken);
      return true;
    }
    return false;
  }
}
