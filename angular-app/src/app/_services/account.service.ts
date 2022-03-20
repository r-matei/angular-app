import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import usersData from '../../assets/credentials.json';
import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  private users: User[] = [];

  constructor(
    private router: Router,
  ) {
    this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
    this.users = usersData;

  }

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  getAll() {
    return this.users;
  }

  register(user: User) {
    this.users.push(user);
    this.router.navigate(['/account/login']);
  }

  login(email: string, password: string) {
    let loginUser = this.users.find(user => user.email == email && user.password == password);

    if (loginUser) {
      localStorage.setItem('user', JSON.stringify(loginUser));
      this.userSubject.next(loginUser);
    }

    return loginUser;
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }
}
