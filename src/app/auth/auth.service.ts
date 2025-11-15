import { Injectable } from '@angular/core';

export interface UserRecord {
  username: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usersKey = 'app_users';
  private sessionKey = 'app_session';

  private loadUsers(): UserRecord[] {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return [];
      const raw = localStorage.getItem(this.usersKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private saveUsers(users: UserRecord[]) {
    if (typeof window === 'undefined' || !window.localStorage) return;
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  register(user: UserRecord): { ok: boolean; message?: string } {
    const users = this.loadUsers();
    if (users.some(u => u.email === user.email)) {
      return { ok: false, message: 'Ya existe un usuario con ese correo.' };
    }
    users.push(user);
    this.saveUsers(users);
    return { ok: true };
  }

  login(email: string, password: string): boolean {
    const users = this.loadUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(this.sessionKey, JSON.stringify({ email: found.email, username: found.username }));
      }
      return true;
    }
    return false;
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.sessionKey);
    }
  }

  isLoggedIn(): boolean {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    return !!localStorage.getItem(this.sessionKey);
  }

  currentUser() {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return null;
      const raw = localStorage.getItem(this.sessionKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
